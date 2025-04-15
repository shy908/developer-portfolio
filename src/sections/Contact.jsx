import { useState, useEffect } from "react";
import { useForm, ValidationError } from "@formspree/react";
import Notiflix from "notiflix";

import TitleHeader from "../components/TitleHeader";
import ContactExperience from "../components/models/contact/ContactExperience";

const Contact = () => {
  const [formState, handleSubmit] = useForm(import.meta.env.VITE_FORMSPREE_ID);
  const [form, setForm] = useState({
    name: "",
    email: "",
    message: "",
  });

  useEffect(() => {
    if (formState.succeeded) {
      Notiflix.Notify.success("Thanks for your message! I’ll be in touch soon.");
      setForm({
        name: "",
        email: "",
        message: "",
      });
    }
  }, [formState.succeeded]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  return (
    <section id="contact" className="flex-center section-padding">
      <div className="w-full h-full md:px-10 px-5">
        <TitleHeader
          title="Get in Touch – Let’s Connect"
          sub="💬 Have questions or ideas? Let’s talk! 🚀"
        />

        <div className="grid-12-cols mt-16">
          <div className="xl:col-span-5">
            <div className="flex-center card-border rounded-xl p-10">
              <form
                onSubmit={handleSubmit}
                className="w-full flex flex-col gap-7"
              >
                <div>
                  <label htmlFor="name">Your name</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                    placeholder="What’s your good name?"
                    required
                  />
                </div>

                <div>
                  <label htmlFor="email">Your Email</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={form.email}
                    onChange={handleChange}
                    placeholder="What’s your email address?"
                    required
                  />
                  <ValidationError
                    prefix="Email"
                    field="email"
                    errors={formState.errors}
                  />
                </div>

                <div>
                  <label htmlFor="message">Your Message</label>
                  <textarea
                    id="message"
                    name="message"
                    value={form.message}
                    onChange={handleChange}
                    placeholder="How can I help you?"
                    rows="5"
                    required
                  />
                  <ValidationError
                    prefix="Message"
                    field="message"
                    errors={formState.errors}
                  />
                </div>

                <button type="submit" disabled={formState.submitting}>
                  <div className="cta-button group">
                    <div className="bg-circle" />
                    <p className="text">
                      {formState.submitting ? "Sending..." : "Send Message"}
                    </p>
                    <div className="arrow-wrapper">
                      <img src="/images/arrow-down.svg" alt="arrow" />
                    </div>
                  </div>
                </button>
              </form>
            </div>
            <div className="mt-8 text-center">
            <p className="text-sm text-gray-500">Prefer direct contact?</p>
            <p className="text-lg font-semibold text-black mt-1">
                📞 <a href="tel:+27626685243" className="text-blue-600 hover:underline">+27 62 668 5243</a>
            </p>
            </div>

          </div>

          <div className="xl:col-span-7 min-h-96">
            <div className="bg-[#cd7c2e] w-full h-full hover:cursor-grab rounded-3xl overflow-hidden">
              <ContactExperience />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
