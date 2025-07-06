
import React, { useState } from 'react';
import Header from '@/components/Header';
import { Send, Image, Phone, Video } from 'lucide-react';

const ChatPage = () => {
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([
    {
      id: '1',
      text: 'Halo! Ada yang bisa saya bantu?',
      time: '10:00',
      isOwn: false,
      sender: 'Customer Service'
    },
    {
      id: '2',
      text: 'Saya ingin menanyakan status pesanan saya',
      time: '10:01',
      isOwn: true
    },
    {
      id: '3',
      text: 'Bisa tolong berikan nomor pesanan Anda?',
      time: '10:02',
      isOwn: false,
      sender: 'Customer Service'
    },
    {
      id: '4',
      text: 'ORD-001',
      time: '10:03',
      isOwn: true
    },
    {
      id: '5',
      text: 'Pesanan Anda sedang dalam perjalanan dan akan sampai besok pagi. Anda akan mendapat notifikasi tracking number via email.',
      time: '10:04',
      isOwn: false,
      sender: 'Customer Service'
    }
  ]);

  const handleSend = () => {
    if (message.trim()) {
      const newMessage = {
        id: Date.now().toString(),
        text: message,
        time: new Date().toLocaleTimeString('id-ID', { 
          hour: '2-digit', 
          minute: '2-digit' 
        }),
        isOwn: true
      };
      
      setMessages(prev => [...prev, newMessage]);
      setMessage('');
      
      // Simulate response
      setTimeout(() => {
        const response = {
          id: (Date.now() + 1).toString(),
          text: 'Terima kasih atas pesan Anda. Tim customer service kami akan segera merespon.',
          time: new Date().toLocaleTimeString('id-ID', { 
            hour: '2-digit', 
            minute: '2-digit' 
          }),
          isOwn: false,
          sender: 'Customer Service'
        };
        setMessages(prev => [...prev, response]);
      }, 1000);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Header */}
      <div className="bg-white border-b">
        <div className="px-4 py-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <img
                src="/placeholder.svg"
                alt="Customer Service"
                className="w-10 h-10 rounded-full"
              />
              <div>
                <h2 className="font-semibold text-gray-900">Customer Service</h2>
                <p className="text-sm text-green-600">Online</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-2">
              <button className="p-2 hover:bg-gray-100 rounded-full">
                <Phone className="w-5 h-5 text-gray-600" />
              </button>
              <button className="p-2 hover:bg-gray-100 rounded-full">
                <Video className="w-5 h-5 text-gray-600" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`flex ${msg.isOwn ? 'justify-end' : 'justify-start'}`}
          >
            <div
              className={`max-w-xs px-4 py-2 rounded-lg ${
                msg.isOwn
                  ? 'bg-[#00B894] text-white'
                  : 'bg-white text-gray-900 border'
              }`}
            >
              {!msg.isOwn && msg.sender && (
                <p className="text-xs text-gray-500 mb-1">{msg.sender}</p>
              )}
              <p className="text-sm">{msg.text}</p>
              <p className={`text-xs mt-1 ${
                msg.isOwn ? 'text-green-100' : 'text-gray-500'
              }`}>
                {msg.time}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Input */}
      <div className="bg-white border-t p-4">
        <div className="flex items-center space-x-2">
          <button className="p-2 hover:bg-gray-100 rounded-full">
            <Image className="w-5 h-5 text-gray-600" />
          </button>
          
          <div className="flex-1 flex items-center bg-gray-100 rounded-full px-4 py-2">
            <input
              type="text"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSend()}
              placeholder="Ketik pesan..."
              className="flex-1 bg-transparent border-0 focus:outline-none text-sm"
            />
          </div>
          
          <button
            onClick={handleSend}
            disabled={!message.trim()}
            className={`p-2 rounded-full ${
              message.trim()
                ? 'bg-[#00B894] text-white'
                : 'bg-gray-300 text-gray-500'
            }`}
          >
            <Send className="w-5 h-5" />
          </button>
        </div>
      </div>
      
      <div className="h-16"></div> {/* Spacer for bottom navigation */}
    </div>
  );
};

export default ChatPage;
