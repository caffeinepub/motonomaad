import Runtime "mo:core/Runtime";
import Map "mo:core/Map";
import Array "mo:core/Array";
import Iter "mo:core/Iter";
import Int "mo:core/Int";
import Nat "mo:core/Nat";
import Text "mo:core/Text";
import Time "mo:core/Time";
import Order "mo:core/Order";
import Principal "mo:core/Principal";
import MixinAuthorization "authorization/MixinAuthorization";
import AccessControl "authorization/access-control";

actor {
  // Types
  type Profile = {
    name : Text;
    bio : Text;
    avatar : Text;
  };

  module Profile {
    public func compare(profile1 : Profile, profile2 : Profile) : Order.Order {
      Text.compare(profile1.name, profile2.name);
    };
  };

  type Trip = {
    from : Text;
    to : Text;
    days : Nat;
    tripType : { #scenic; #offroad; #urban };
    waypoints : [Text];
  };

  module Trip {
    public func compare(trip1 : Trip, trip2 : Trip) : Order.Order {
      switch (Text.compare(trip1.from, trip2.from)) {
        case (#equal) {
          switch (Text.compare(trip1.to, trip2.to)) {
            case (#equal) { Nat.compare(trip1.days, trip2.days) };
            case (order) { order };
          };
        };
        case (order) { order };
      };
    };
  };

  type Mechanic = {
    name : Text;
    location : Text;
    specialties : [Text];
    rating : Float;
    contactInfo : Text;
  };

  module Mechanic {
    public func compare(mechanic1 : Mechanic, mechanic2 : Mechanic) : Order.Order {
      Text.compare(mechanic1.name, mechanic2.name);
    };
  };

  type MechanicRequest = {
    user : Principal;
    problemDescription : Text;
    mechanic : Text;
    status : { #pending; #accepted; #rejected; #completed };
    createdAt : Int;
  };

  module MechanicRequest {
    public func compare(request1 : MechanicRequest, request2 : MechanicRequest) : Order.Order {
      Int.compare(request1.createdAt, request2.createdAt);
    };
  };

  type FeedPost = {
    author : Principal;
    content : Text;
    createdAt : Int;
  };

  module FeedPost {
    public func compare(post1 : FeedPost, post2 : FeedPost) : Order.Order {
      Int.compare(post1.createdAt, post2.createdAt);
    };
  };

  type Group = {
    name : Text;
    description : Text;
    owner : Principal;
    members : [Principal];
    createdAt : Int;
  };

  module Group {
    public func compare(group1 : Group, group2 : Group) : Order.Order {
      Int.compare(group1.createdAt, group2.createdAt);
    };
  };

  type Event = {
    name : Text;
    location : Text;
    description : Text;
    datetime : Int;
    owner : Principal;
    attendees : [Principal];
    createdAt : Int;
  };

  module Event {
    public func compare(event1 : Event, event2 : Event) : Order.Order {
      Int.compare(event1.createdAt, event2.createdAt);
    };
  };

  // Persistent state
  let profiles = Map.empty<Principal, Profile>();
  let trips = Map.empty<Text, Trip>();
  let mechanics = Map.empty<Text, Mechanic>();
  let mechanicRequests = Map.empty<Principal, MechanicRequest>();
  let posts = Map.empty<Int, FeedPost>();
  let groups = Map.empty<Nat, Group>();
  let events = Map.empty<Nat, Event>();

  // Authorization
  let accessControlState = AccessControl.initState();
  include MixinAuthorization(accessControlState);

  // Profiles
  public shared ({ caller }) func saveCallerUserProfile(profile : Profile) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can save profiles");
    };
    profiles.add(caller, profile);
  };

  public query ({ caller }) func getCallerUserProfile() : async ?Profile {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can access profiles");
    };
    profiles.get(caller);
  };

  public query ({ caller }) func getUserProfile(user : Principal) : async ?Profile {
    if (caller != user and not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Can only view your own profile");
    };
    profiles.get(user);
  };

  // Trip Planner
  public query ({ caller }) func suggestTrips(from : Text, to : Text, days : Nat, tripType : { #scenic; #offroad; #urban }) : async [Trip] {
    trips.values().toArray().sort().filter(
      func(trip) {
        trip.from == from and trip.to == to and trip.days == days and trip.tripType == tripType
      }
    );
  };

  public shared ({ caller }) func addTrip(trip : Trip) : async () {
    if (not (AccessControl.isAdmin(accessControlState, caller))) {
      Runtime.trap("Unauthorized: Only admins can add trips");
    };
    let tripId = trip.from # "-" # trip.to # "-" # trip.days.toText();
    trips.add(tripId, trip);
  };

  public query ({ caller }) func getAllTrips() : async [Trip] {
    trips.values().toArray().sort();
  };

  // Mechanics
  public query ({ caller }) func getMechanics() : async [Mechanic] {
    mechanics.values().toArray().sort();
  };

  public shared ({ caller }) func addMechanic(mechanic : Mechanic) : async () {
    if (not (AccessControl.isAdmin(accessControlState, caller))) {
      Runtime.trap("Unauthorized: Only admins can add mechanics");
    };
    mechanics.add(mechanic.name, mechanic);
  };

  // Mechanic requests
  public shared ({ caller }) func createMechanicRequest(problemDescription : Text, mechanic : Text) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can create mechanic requests");
    };
    switch (mechanics.get(mechanic)) {
      case (null) { Runtime.trap("Mechanic does not exist") };
      case (?_) {
        let newRequest : MechanicRequest = {
          user = caller;
          problemDescription;
          mechanic;
          status = #pending;
          createdAt = Time.now();
        };
        mechanicRequests.add(caller, newRequest);
      };
    };
  };

  public shared ({ caller }) func updateRequestStatus(user : Principal, status : { #pending; #accepted; #rejected; #completed }) : async () {
    if (not (AccessControl.isAdmin(accessControlState, caller))) {
      Runtime.trap("Unauthorized: Only admins can update request status");
    };
    switch (mechanicRequests.get(user)) {
      case (null) { Runtime.trap("Request does not exist") };
      case (?request) {
        mechanicRequests.add(user, { request with status });
      };
    };
  };

  public query ({ caller }) func getUserRequests() : async [MechanicRequest] {
    if (AccessControl.isAdmin(accessControlState, caller)) {
      // Admins can see all requests
      mechanicRequests.values().toArray().sort();
    } else if (AccessControl.hasPermission(accessControlState, caller, #user)) {
      // Users can only see their own requests
      mechanicRequests.values().toArray().filter(func(request) { request.user == caller }).sort();
    } else {
      Runtime.trap("Unauthorized: Only users can view requests");
    };
  };

  // Social feed
  public shared ({ caller }) func createPost(content : Text) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can create posts");
    };
    let newPost : FeedPost = {
      author = caller;
      content;
      createdAt = Time.now();
    };
    posts.add(newPost.createdAt, newPost);
  };

  public query ({ caller }) func getFeed() : async [FeedPost] {
    posts.values().toArray().sort();
  };

  // Groups
  public shared ({ caller }) func createGroup(name : Text, description : Text) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can create groups");
    };
    let groupId = groups.size() + 1;
    let newGroup : Group = {
      name;
      description;
      owner = caller;
      members = [];
      createdAt = Time.now();
    };
    groups.add(groupId, newGroup);
  };

  public shared ({ caller }) func joinGroup(groupId : Nat) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can join groups");
    };
    switch (groups.get(groupId)) {
      case (null) { Runtime.trap("Group does not exist") };
      case (?group) {
        let updatedMembers = group.members.concat([caller]);
        groups.add(groupId, { group with members = updatedMembers });
      };
    };
  };

  public shared ({ caller }) func leaveGroup(groupId : Nat) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can leave groups");
    };
    switch (groups.get(groupId)) {
      case (null) { Runtime.trap("Group does not exist") };
      case (?group) {
        let updatedMembers = group.members.filter(func(member) { member != caller });
        groups.add(groupId, { group with members = updatedMembers });
      };
    };
  };

  public query ({ caller }) func getAllGroups() : async [Group] {
    groups.values().toArray().sort();
  };

  // Events
  public shared ({ caller }) func createEvent(name : Text, location : Text, description : Text, datetime : Int) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can create events");
    };
    let eventId = events.size() + 1;
    let newEvent : Event = {
      name;
      location;
      description;
      datetime;
      owner = caller;
      attendees = [];
      createdAt = Time.now();
    };
    events.add(eventId, newEvent);
  };

  public shared ({ caller }) func joinEvent(eventId : Nat) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can join events");
    };
    switch (events.get(eventId)) {
      case (null) { Runtime.trap("Event does not exist") };
      case (?event) {
        let updatedAttendees = event.attendees.concat([caller]);
        events.add(eventId, { event with attendees = updatedAttendees });
      };
    };
  };

  public shared ({ caller }) func leaveEvent(eventId : Nat) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can leave events");
    };
    switch (events.get(eventId)) {
      case (null) { Runtime.trap("Event does not exist") };
      case (?event) {
        let updatedAttendees = event.attendees.filter(func(attendee) { attendee != caller });
        events.add(eventId, { event with attendees = updatedAttendees });
      };
    };
  };

  public query ({ caller }) func getUpcomingEvents() : async [Event] {
    events.values().toArray().sort();
  };

  // Profile overview
  public query ({ caller }) func getProfileOverview(user : Principal) : async {
    profile : ?Profile;
    posts : [FeedPost];
    groups : [Group];
    events : [Event];
    mechanicRequests : [MechanicRequest];
  } {
    if (caller != user and not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Can only view your own profile overview");
    };

    let userPosts = posts.values().toArray().filter(func(post) { post.author == user });
    let userGroups = groups.values().toArray().filter(
      func(group) {
        group.members.find(func(member) { member == user }) != null
      }
    );
    let userEvents = events.values().toArray().filter(
      func(event) {
        event.attendees.find(func(attendee) { attendee == user }) != null
      }
    );
    let userRequests = mechanicRequests.values().toArray().filter(func(request) { request.user == user });

    {
      profile = profiles.get(user);
      posts = userPosts;
      groups = userGroups;
      events = userEvents;
      mechanicRequests = userRequests;
    };
  };
};
