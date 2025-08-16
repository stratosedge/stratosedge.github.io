import React, { useState } from 'react';
import { Briefcase, GraduationCap, Building2, Users, School } from 'lucide-react';
import { submitContact, auth } from '../services/firebaseService';
import type { User } from '../types';

interface CollaboratePageProps {
  user: User | null;
  onLoginClick: () => void;
}

export const CollaboratePage: React.FC<CollaboratePageProps> = ({ user, onLoginClick }) => {
  const [orgName, setOrgName] = useState('');
  const [contact, setContact] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [message, setMessage] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage(null);
    if (!orgName.trim() || !contact.trim()) {
      setMessage('Please enter organization name and contact.');
      return;
    }
    setSubmitting(true);
    try {
  const userEmail = user?.email || auth.currentUser?.email || undefined;
  await submitContact({ orgName: orgName.trim(), contact: contact.trim(), userEmail });
      setMessage('Submitted! We will reach out shortly.');
      setOrgName('');
      setContact('');
    } catch (err) {
      setMessage('Submission failed. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };
  return (
    <div className="bg-gray-900 text-white">
      <section className="container mx-auto px-4 sm:px-6 lg:px-8 pt-10 pb-8 grid md:grid-cols-2 gap-6 items-start">
        <div>
          <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight">Collaborate With Us</h1>
          <p className="mt-3 text-gray-300 max-w-3xl">Partner as an individual mentor/trainer or as an organization to empower learners. Explore our corporate and campus programs designed for real outcomes.</p>
        </div>
        <div className="rounded-xl border border-gray-800 bg-gray-800/40 p-6">
          <h3 className="text-lg font-semibold mb-3">Contact Us</h3>
          {!user ? (
            <div className="flex flex-col md:flex-row md:items-center gap-3">
              <p className="text-gray-300">Please log in to send us your details.</p>
              <div>
                <button onClick={onLoginClick} className="rounded-md bg-indigo-600 hover:bg-indigo-700 text-white font-semibold px-4 py-2">Login / Sign Up</button>
              </div>
            </div>
          ) : (
            <>
              <form onSubmit={handleSubmit} className="grid md:grid-cols-3 gap-3">
                <input
                  type="text"
                  placeholder="Organization / Individual name"
                  className="w-full rounded-md bg-gray-900 border border-gray-700 text-white px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  value={orgName}
                  onChange={(e) => setOrgName(e.target.value)}
                />
                <input
                  type="text"
                  placeholder="Email or phone"
                  className="w-full rounded-md bg-gray-900 border border-gray-700 text-white px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  value={contact}
                  onChange={(e) => setContact(e.target.value)}
                />
                <button
                  type="submit"
                  disabled={submitting}
                  className="inline-flex items-center justify-center rounded-md bg-indigo-600 hover:bg-indigo-700 disabled:opacity-60 text-white font-semibold px-4 py-2"
                >
                  {submitting ? 'Sending…' : 'Send'}
                </button>
              </form>
              {message && <div className="mt-3 text-sm text-gray-300">{message}</div>}
            </>
          )}
        </div>
      </section>

      <section className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 grid md:grid-cols-2 gap-6">
        <div className="rounded-xl border border-gray-800 bg-gray-800/40 p-6">
          <div className="flex items-center gap-3">
            <Users className="w-6 h-6 text-indigo-400" />
            <h2 className="text-xl font-semibold">For Individuals</h2>
          </div>
          <ul className="mt-4 space-y-2 text-gray-300 list-disc list-inside">
            <li>Mentor with us: guide cohorts and review capstone projects</li>
            <li>Become a trainer: deliver modules in your area of expertise</li>
            <li>Contribute content: build labs, case studies, and assessments</li>
          </ul>
        </div>
        <div className="rounded-xl border border-gray-800 bg-gray-800/40 p-6">
          <div className="flex items-center gap-3">
            <Building2 className="w-6 h-6 text-emerald-400" />
            <h2 className="text-xl font-semibold">For Organizations</h2>
          </div>
          <ul className="mt-4 space-y-2 text-gray-300 list-disc list-inside">
            <li>Hire-trained talent via our placement programs</li>
            <li>Co-create custom upskilling tracks with your SMEs</li>
            <li>Offer real-world problem statements and internships</li>
          </ul>
        </div>
      </section>

      <section className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 grid md:grid-cols-2 gap-6">
        <div className="rounded-xl border border-gray-800 bg-gray-800/40 p-6">
          <div className="flex items-center gap-3">
            <Briefcase className="w-6 h-6 text-yellow-400" />
            <h2 className="text-xl font-semibold">Corporate Training Programs</h2>
          </div>
          <ul className="mt-4 space-y-2 text-gray-300 list-disc list-inside">
            <li>Full Stack, Data, Cloud, Cybersecurity bootcamps</li>
            <li>Role-based tracks: SDE, DevOps, QA Automation</li>
            <li>Soft skills: communication, collaboration, leadership</li>
          </ul>
        </div>
        <div className="rounded-xl border border-gray-800 bg-gray-800/40 p-6">
          <div className="flex items-center gap-3">
            <GraduationCap className="w-6 h-6 text-sky-400" />
            <h2 className="text-xl font-semibold">College CRT Programs</h2>
          </div>
          <ul className="mt-4 space-y-2 text-gray-300 list-disc list-inside">
            <li>Aptitude + Reasoning + Coding interview prep</li>
            <li>Company-specific drives: mock tests and interviews</li>
            <li>Capstone-based portfolio and placement assistance</li>
          </ul>
        </div>
      </section>

      <section className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="rounded-xl border border-gray-800 bg-gray-800/40 p-6">
          <div className="flex items-center gap-3">
            <School className="w-6 h-6 text-pink-400" />
            <h2 className="text-xl font-semibold">School-level Programs for Students</h2>
          </div>
          <ul className="mt-4 space-y-2 text-gray-300 list-disc list-inside">
            <li>Foundation coding (Scratch, Python basics)</li>
            <li>STEM clubs: robotics, IoT, and maker activities</li>
            <li>Communication and digital citizenship workshops</li>
          </ul>
        </div>
      </section>
    </div>
  );
};

export default CollaboratePage;
