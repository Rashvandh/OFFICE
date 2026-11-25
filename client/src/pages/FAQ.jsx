import HeroBanner from '../components/common/HeroBanner.jsx';
import FAQAccordion from '../components/common/FAQAccordion.jsx';
import { PrimaryButton } from '../components/common/Buttons.jsx';

const FAQ_ITEMS = [
  {
    question: 'What systems of wellness inspire Gramiyam products?',
    answer:
      'Gramiyam formulations draw from classical Tamil Siddha and Ayurveda herbal traditions, combined with modern quality control.',
  },
  {
    question: 'Are the prices and stock quantities shown online final?',
    answer:
      'During this staging phase, product prices and stock labels are illustrative placeholders until the official Gramiyam catalogue is published from the backend.',
  },
  {
    question: 'How are online payments processed?',
    answer:
      'Online payments are designed to use Razorpay Checkout with server-side order creation and signature verification.',
  },
  {
    question: 'How can I track my order?',
    answer:
      'Visit the Track Your Order page and enter your Order ID along with your registered email, phone, or product name.',
  },
  {
    question: 'How do I enquire about a Gramiyam franchise?',
    answer:
      'Please visit our Franchise page and submit the enquiry form with your location and business background.',
  },
];

export default function FAQ() {
  return (
    <main>
      <HeroBanner
        compact
        eyebrow="Help Centre"
        title="Frequently Asked Questions"
        subtitle="Answers about Gramiyam formulations, orders, shipping, and franchise enquiries."
      />

      <section className="py-12 sm:py-16">
        <div className="container-gramiyam max-w-3xl">
          <FAQAccordion items={FAQ_ITEMS} />

          <div className="mt-12 rounded-sm border border-softgrey bg-white p-8 text-center">
            <h2 className="font-serif text-2xl font-medium text-forest">
              Still Have Questions?
            </h2>
            <p className="mt-2 text-sm text-charcoal/75">
              Reach out to our customer care team for further assistance.
            </p>
            <div className="mt-5">
              <PrimaryButton to="/contact">Contact Us</PrimaryButton>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
