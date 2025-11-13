import React from 'react';
import { Mail, Phone, Instagram, Send } from 'lucide-react';

export default function ContactSection() {
  const contactInfo = [
    {
      icon: <Mail size={24} />,
      label: 'Email',
      value: 'smartmom@gmail.com',
      link: 'mailto:smartmom@gmail.com',
      color: 'from-blue-400 to-blue-600'
    },
    {
      icon: <Phone size={24} />,
      label: 'Telepon',
      value: '08123456789',
      link: 'tel:08123456789',
      color: 'from-green-400 to-green-600'
    },
    {
      icon: <Instagram size={24} />,
      label: 'Instagram',
      value: '@smartmom.care',
      link: 'https://instagram.com/smartmom.care',
      color: 'from-pink-400 to-purple-600'
    }
  ];

  return (
    <section id="contact" className="py-16 lg:py-20 bg-gradient-to-br from-pink-50 to-white">
      <div className="max-w-6xl mx-auto px-4 lg:px-6">
        {/* Section Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-pink-400 to-pink-600 rounded-3xl mb-4 shadow-lg transform hover:scale-105 transition-transform">
              <div className="w-15 h-15 rounded-full bg-white flex items-center justify-center">
                <img
                  src="/logo.png"
                  className="w-14 h-14 rounded-full"
                  alt="logo"
                />
              </div>
            </div>
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-800 mb-3">
            Hubungi Kami
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Punya pertanyaan? Kami siap membantu Anda.
          </p>
        </div>

        {/* Contact Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
          {contactInfo.map((contact, index) => (
            <a
              key={index}
              href={contact.link}
              target={contact.label === 'Instagram' ? '_blank' : undefined}
              rel={contact.label === 'Instagram' ? 'noopener noreferrer' : undefined}
              className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 hover:shadow-lg transition-all group text-center"
            >
              <div className={`w-14 h-14 bg-gradient-to-br ${contact.color} rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform`}>
                <div className="text-white">{contact.icon}</div>
              </div>
              <h3 className="font-semibold text-gray-800 mb-1">{contact.label}</h3>
              <p className="text-sm text-gray-600">{contact.value}</p>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}