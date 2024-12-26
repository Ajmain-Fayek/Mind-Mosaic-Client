import { Accordion } from "flowbite-react";

const FAQAccordion = () => {
    return (
        <Accordion>
            <Accordion.Panel>
                <Accordion.Title>What is Mind Mosaic?</Accordion.Title>
                <Accordion.Content>
                    <p className="mb-2 ">
                        Mind Mosaic is an interactive platform designed to help
                        users organize and visualize their thoughts, ideas, and
                        plans. Whether you're brainstorming, journaling, or
                        managing projects, Mind Mosaic provides tools to
                        streamline your creative and organizational processes.
                    </p>
                </Accordion.Content>
            </Accordion.Panel>
            <Accordion.Panel>
                <Accordion.Title>
                    Is my data secure on Mind Mosaic?
                </Accordion.Title>
                <Accordion.Content>
                    <p className="mb-2 ">
                        Yes, your data is secure on Mind Mosaic. We use
                        industry-standard encryption to protect your information
                        and ensure privacy. You have full control over your
                        data, and we do not share it with third parties without
                        your consent.
                    </p>
                </Accordion.Content>
            </Accordion.Panel>
            <Accordion.Panel>
                <Accordion.Title>
                    Can I collaborate with others using Mind Mosaic?
                </Accordion.Title>
                <Accordion.Content>
                    <p className="mb-2 ">
                        Absolutely! Mind Mosaic supports collaboration features,
                        allowing you to share your mosaics with others. You can
                        invite teammates or friends to view or edit your content
                        in real time, making it perfect for group projects or
                        collective brainstorming.
                    </p>
                </Accordion.Content>
            </Accordion.Panel>
        </Accordion>
    );
};

export default FAQAccordion;
