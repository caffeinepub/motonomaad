import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export interface Trip {
    to: string;
    tripType: Variant_scenic_urban_offroad;
    days: bigint;
    from: string;
    waypoints: Array<string>;
}
export interface Event {
    owner: Principal;
    name: string;
    createdAt: bigint;
    description: string;
    attendees: Array<Principal>;
    location: string;
    datetime: bigint;
}
export interface MechanicRequest {
    status: Variant_pending_completed_rejected_accepted;
    createdAt: bigint;
    user: Principal;
    mechanic: string;
    problemDescription: string;
}
export interface Group {
    members: Array<Principal>;
    owner: Principal;
    name: string;
    createdAt: bigint;
    description: string;
}
export interface Profile {
    bio: string;
    name: string;
    avatar: string;
}
export interface Mechanic {
    contactInfo: string;
    name: string;
    specialties: Array<string>;
    rating: number;
    location: string;
}
export interface FeedPost {
    content: string;
    createdAt: bigint;
    author: Principal;
}
export enum UserRole {
    admin = "admin",
    user = "user",
    guest = "guest"
}
export enum Variant_pending_completed_rejected_accepted {
    pending = "pending",
    completed = "completed",
    rejected = "rejected",
    accepted = "accepted"
}
export enum Variant_scenic_urban_offroad {
    scenic = "scenic",
    urban = "urban",
    offroad = "offroad"
}
export interface backendInterface {
    addMechanic(mechanic: Mechanic): Promise<void>;
    addTrip(trip: Trip): Promise<void>;
    assignCallerUserRole(user: Principal, role: UserRole): Promise<void>;
    createEvent(name: string, location: string, description: string, datetime: bigint): Promise<void>;
    createGroup(name: string, description: string): Promise<void>;
    createMechanicRequest(problemDescription: string, mechanic: string): Promise<void>;
    createPost(content: string): Promise<void>;
    getAllGroups(): Promise<Array<Group>>;
    getAllTrips(): Promise<Array<Trip>>;
    getCallerUserProfile(): Promise<Profile | null>;
    getCallerUserRole(): Promise<UserRole>;
    getFeed(): Promise<Array<FeedPost>>;
    getMechanics(): Promise<Array<Mechanic>>;
    getProfileOverview(user: Principal): Promise<{
        groups: Array<Group>;
        mechanicRequests: Array<MechanicRequest>;
        events: Array<Event>;
        posts: Array<FeedPost>;
        profile?: Profile;
    }>;
    getUpcomingEvents(): Promise<Array<Event>>;
    getUserProfile(user: Principal): Promise<Profile | null>;
    getUserRequests(): Promise<Array<MechanicRequest>>;
    isCallerAdmin(): Promise<boolean>;
    joinEvent(eventId: bigint): Promise<void>;
    joinGroup(groupId: bigint): Promise<void>;
    leaveEvent(eventId: bigint): Promise<void>;
    leaveGroup(groupId: bigint): Promise<void>;
    saveCallerUserProfile(profile: Profile): Promise<void>;
    suggestTrips(from: string, to: string, days: bigint, tripType: Variant_scenic_urban_offroad): Promise<Array<Trip>>;
    updateRequestStatus(user: Principal, status: Variant_pending_completed_rejected_accepted): Promise<void>;
}
