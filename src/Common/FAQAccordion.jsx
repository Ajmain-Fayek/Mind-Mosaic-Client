import { Accordion } from "flowbite-react";

const FAQAccordion = () => {
    const faqs = [
        {
            question: "What is Mind Mosaic?",
            answer: "Mind Mosaic is an interactive platform designed to help users organize and visualize their thoughts, ideas, and plans. Whether you're brainstorming, journaling, or managing projects, Mind Mosaic provides tools to streamline your creative and organizational processes.",
        },
        {
            question: "Is my data secure on Mind Mosaic?",
            answer: "Yes, your data is secure on Mind Mosaic. We use industry-standard encryption to protect your information and ensure privacy. You have full control over your data, and we do not share it with third parties without your consent.",
        },
        {
            question: "Can I collaborate with others using Mind Mosaic?",
            answer: "Absolutely! Mind Mosaic supports collaboration features, allowing you to share your mosaics with others. You can invite teammates or friends to view or edit your content in real time, making it perfect for group projects or collective brainstorming.",
        },
    ];


    return (
        <Accordion
            collapseAll
            theme={{
                base: "divide-y divide-dark border border-dark",
                flush: {
                    off: "rounded-none border",
                    on: "border",
                },
            }}
            className="focus:border-dark"
        >
            {faqs.map((faq, index) => (
                <Accordion.Panel key={index}>
                    <Accordion.Title
                        className="focus:ring-0 hover:bg-semi-dark focus:bg-semi-dark bg-light"
                        theme={{
                            base: "flex w-full items-center justify-between p-5 text-left font-medium text-gray-500 first:rounded-none last:rounded-none",
                        }}
                    >
                        {faq.question}
                    </Accordion.Title>
                    <Accordion.Content
                        theme={{
                            base: "p-5 first:rounded-none last:rounded-none",
                        }}
                    >
                        <p className="mb-2">{faq.answer}</p>
                    </Accordion.Content>
                </Accordion.Panel>
            ))}
        </Accordion>
    );
};

export default FAQAccordion;
