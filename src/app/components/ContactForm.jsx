"use client";

import { useState } from "react";

export default function Contact() {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData(e.currentTarget);

    // TODO: replace with your API / email service
    await new Promise((res) => setTimeout(res, 1500));

    setLoading(false);
    setSuccess(true);
    e.currentTarget.reset();
  }

  return (
    <section className="mx-2 rounded-4xl relative min-h-screen px-6 py-24 text-white md:px-16 lg:px-24 overflow-hidden"
    style={{background:"url(/images/contact-bg.png)", backgroundSize:"cover"}}
    >
        <div className="absolute inset-0 bg-black/50 z-1">

        </div>
      <div className="relative z-2 mx-auto grid max-w-7xl gap-20 md:grid-cols-2 items-center">

        {/* Left Content */}
        <div>
          <h1 className="bilgie text-5xl md:text-7xl font-light">
            Get in <br/><span className="italic">Touch</span>
          </h1>

          <p className="font-2 text-xl mt-6 max-w-md text-neutral-200">
            Great ideas deserve exceptional visuals.
            Let’s create something incredible together!
          </p>
        </div>

        {/* Form */}
        <form
          onSubmit={handleSubmit}
          className="rounded-4xl bg-white/5 p-8 backdrop-blur-md"
        >
          <h2 className="mb-8 font-2 text-center text-2xl tracking-widest">
            CONTACT
          </h2>

          <div className="space-y-5">
            <input
              required
              name="name"
              placeholder="Name"
              className="w-full rounded-lg bg-white/10 px-4 py-3 text-white placeholder:text-neutral-400 outline-none"
            />

            <input
              required
              type="email"
              name="email"
              placeholder="Email"
              className="w-full rounded-lg bg-white/10 px-4 py-3 text-white placeholder:text-neutral-400 outline-none"
            />

            <textarea
              required
              name="message"
              placeholder="Message"
              rows={4}
              className="w-full rounded-lg bg-white/10 px-4 py-3 text-white placeholder:text-neutral-400 outline-none"
              style={{fieldSizing:"content",resize:"none"}}
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="font-2 mt-8 w-full rounded-xl bg-white py-4 font-semibold text-black transition hover:scale-105 disabled:opacity-50"
          >
            {loading ? "Sending..." : success ? "Sent ✓" : "Submit"}
          </button>
        </form>
      </div>
    </section>
  );
}
