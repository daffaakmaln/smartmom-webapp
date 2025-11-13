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

        {/* Bottom CTA */}
        <div className="mt-12 text-center">
          <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8 max-w-2xl mx-auto">
            <h3 className="text-xl font-bold text-gray-800 mb-2">
              Siap Memulai Perjalanan Kehamilan Anda?
            </h3>
            <p className="text-gray-600 mb-6">
              Bergabunglah dengan ribuan ibu hamil lainnya dan dapatkan dukungan yang Anda butuhkan.
            </p>
            <button className="bg-pink-500 text-white px-8 py-3 rounded-full hover:bg-pink-600 transition-all font-semibold inline-flex items-center gap-2 shadow-md">
              <Send size={18} />
              Daftar Sekarang
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}