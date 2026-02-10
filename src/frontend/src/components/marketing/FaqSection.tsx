export default function FaqSection() {
  const faqs = [
    {
      question: 'What is Motonomad?',
      answer:
        'Motonomad is a comprehensive platform designed specifically for motorcycle adventurers. We provide trip planning tools, mechanic directories, community features, and event coordination—everything you need to plan and enjoy epic motorcycle journeys.',
    },
    {
      question: 'Is Motonomad free to use?',
      answer:
        'Yes! Motonomad is completely free to use. You can plan trips, connect with other riders, find mechanics, join groups, and participate in events without any subscription fees.',
    },
    {
      question: 'How does the trip planner work?',
      answer:
        'Our trip planner uses your starting point, destination, trip duration, and riding style preferences (scenic, off-road, or urban) to suggest curated routes with detailed waypoints. Each suggestion includes estimated duration and highlights along the way.',
    },
    {
      question: 'Are the mechanics on your platform certified?',
      answer:
        'Yes, all mechanics listed on Motonomad are certified professionals. We verify their credentials and specialties to ensure you receive quality service. You can view ratings, specialties, and contact information for each mechanic.',
    },
    {
      question: 'How do I join a riding group or event?',
      answer:
        'Simply browse our Groups or Events pages, find one that interests you, and click the join button. You can also create your own groups and events to connect with riders who share your interests and routes.',
    },
    {
      question: 'Can I use Motonomad on my mobile device?',
      answer:
        'Absolutely! Motonomad is fully responsive and works seamlessly on smartphones, tablets, and desktop computers. Access your trip plans, connect with riders, and find mechanics wherever your journey takes you.',
    },
  ];

  return (
    <section id="faq" data-testid="REQ-16" className="py-20 md:py-28">
      <div className="container">
        <div className="text-center space-y-4 mb-16">
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight">Frequently Asked Questions</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Everything you need to know about Motonomad
          </p>
        </div>
        <div className="max-w-3xl mx-auto space-y-4">
          {faqs.map((faq, index) => (
            <details
              key={index}
              className="group border-2 border-border rounded-lg overflow-hidden hover:border-primary/50 transition-colors"
            >
              <summary className="cursor-pointer list-none px-6 py-5 font-semibold text-lg flex items-center justify-between hover:bg-muted/50 transition-colors">
                <span>{faq.question}</span>
                <svg
                  className="w-5 h-5 text-muted-foreground transition-transform group-open:rotate-180"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </summary>
              <div className="px-6 py-5 pt-0 text-muted-foreground border-t border-border bg-muted/20">
                <p>{faq.answer}</p>
              </div>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
