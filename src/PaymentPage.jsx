import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const MOCK_ORDER = {
  type: 'TICKET', // TICKET, DONATION, MEMBERSHIP
  amount: 250,
  details: {
    event: "An Evening With Reese | 2026 National Tour",
    tier: "VIP Experience",
    location: "California · Los Angeles",
    date: "June 2026",
    guests: 2,
    fee: 12.50
  },
  buyer: {
    name: "Jane Doe",
    email: "jane@example.com",
    phone: "+1 (310) 555-0199"
  }
};

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } }
};

export default function PaymentPage({ order = MOCK_ORDER }) {
  const [step, setStep] = useState(1);
  const [method, setMethod] = useState(null); // 'CARD', 'WIRE', 'CRYPTO'
  
  // Card Form State
  const [cardName, setCardName] = useState('');
  const [cardNumber, setCardNumber] = useState('');
  const [cardExpiry, setCardExpiry] = useState('');
  const [cardCvv, setCardCvv] = useState('');
  const [cardEmail, setCardEmail] = useState(order.buyer.email || '');
  const [processing, setProcessing] = useState(false);
  const [success, setSuccess] = useState(false);

  // Wire State
  const [copied, setCopied] = useState(null);

  const handleCardFormat = (e) => {
    let val = e.target.value.replace(/\D/g, '');
    let formatted = val.match(/.{1,4}/g)?.join(' ') || val;
    if (formatted.length > 19) formatted = formatted.substring(0, 19);
    setCardNumber(formatted);
  };

  const handleExpiryFormat = (e) => {
    let val = e.target.value.replace(/\D/g, '');
    if (val.length > 2) {
      val = val.substring(0, 2) + '/' + val.substring(2, 4);
    }
    setCardExpiry(val);
  };

  const handleCopy = (text, field) => {
    navigator.clipboard.writeText(text);
    setCopied(field);
    setTimeout(() => setCopied(null), 2000);
  };

  const simulatePayment = (e) => {
    e.preventDefault();
    setProcessing(true);
    setTimeout(() => {
      setProcessing(false);
      setSuccess(true);
    }, 2000);
  };

  const getTotal = () => {
    if (order.type === 'TICKET') return order.amount + order.details.fee;
    return order.amount;
  };

  return (
    <div className="min-h-screen bg-cream text-dark font-jost antialiased py-[60px] px-[20px]">
      
      {/* STEPPER UI */}
      <div className="max-w-[600px] mx-auto mb-[60px]">
        <div className="flex items-center justify-between relative">
          <div className="absolute top-1/2 left-[10%] right-[10%] h-[1px] bg-border -z-10" />
          
          {[
            { id: 1, label: 'Summary' },
            { id: 2, label: 'Payment Method' },
            { id: 3, label: 'Details' }
          ].map((s) => (
            <div key={s.id} className="flex flex-col items-center gap-3 bg-cream px-4">
              <div className={`w-[32px] h-[32px] rounded-full flex items-center justify-center transition-colors duration-300 ${
                success ? 'bg-dark text-gold' :
                step > s.id ? 'bg-dark text-gold' :
                step === s.id ? 'bg-gold text-white' : 'bg-cream border-2 border-muted text-muted'
              }`}>
                {(success || step > s.id) ? <i className="ri-check-line text-[16px]"></i> : <span className="text-[12px] font-bold">{s.id}</span>}
              </div>
              <span className={`text-[11px] uppercase tracking-[2px] font-semibold ${
                success || step >= s.id ? 'text-gold' : 'text-muted'
              }`}>
                {s.label}
              </span>
            </div>
          ))}
        </div>
      </div>

      <AnimatePresence mode="wait">
        
        {/* STEP 1: SUMMARY */}
        {step === 1 && (
          <motion.div key="step1" variants={fadeUp} initial="hidden" animate="visible" exit={{ opacity: 0, y: -20 }} className="max-w-[640px] mx-auto bg-cream">
            <div className="text-center mb-[40px]">
              <span className="text-gold text-[11px] uppercase tracking-[4px] font-semibold block mb-4">Reese Witherspoon Official</span>
              <h1 className="font-cormorant font-light text-[52px] leading-[1.1] gold-italic-emphasis mb-6">
                Your Order <em>Summary</em>
              </h1>
              <div className="w-[80px] h-[1px] bg-gold mx-auto" />
            </div>

            <div className="bg-warm-white border border-border border-l-[4px] !border-l-gold rounded-[4px] p-[32px] shadow-sm mb-8">
              {order.type === 'TICKET' && (
                <>
                  <span className="text-gold text-[11px] uppercase tracking-[3px] font-semibold block mb-2">Tour Ticket</span>
                  <p className="font-jost text-[14px] text-muted mb-1">{order.details.event}</p>
                  <h2 className="font-cormorant text-dark text-[28px] leading-tight mb-4">{order.details.tier}</h2>
                  <div className="flex flex-col gap-1 mb-6 text-[15px] text-dark">
                    <p><strong>Location:</strong> {order.details.location}</p>
                    <p><strong>Date:</strong> {order.details.date}</p>
                    <p><strong>Guests:</strong> {order.details.guests} Guests</p>
                  </div>
                  <div className="border-t border-border pt-6 mt-6">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-[14px] text-muted">Ticket Price × {order.details.guests}</span>
                      <span className="text-[15px] font-medium">${order.amount.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between items-center mb-4">
                      <span className="text-[14px] text-muted">Processing Fee (5%)</span>
                      <span className="text-[15px] text-muted">${order.details.fee.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between items-end border-t border-border pt-4">
                      <span className="text-[15px] font-semibold uppercase tracking-[1px]">Total</span>
                      <span className="font-cormorant text-gold text-[32px] font-bold leading-none">${getTotal().toFixed(2)}</span>
                    </div>
                  </div>
                </>
              )}

              {order.type === 'DONATION' && (
                <>
                  <span className="text-gold text-[11px] uppercase tracking-[3px] font-semibold block mb-2">Fan Donation</span>
                  <h2 className="font-cormorant text-dark text-[28px] leading-tight mb-4">Sending Love to Reese</h2>
                  <div className="text-center py-6">
                    <span className="font-cormorant text-gold text-[48px] font-bold">${order.amount.toFixed(2)}</span>
                    <p className="text-muted italic text-[14px] mt-2">"Your gesture means the world."</p>
                  </div>
                </>
              )}

              {order.type === 'MEMBERSHIP' && (
                <>
                  <span className="text-gold text-[11px] uppercase tracking-[3px] font-semibold block mb-2">Membership</span>
                  <h2 className="font-cormorant text-dark text-[28px] leading-tight mb-2">Reese Witherspoon Official Member</h2>
                  <p className="text-[15px] text-muted mb-6">Annual Membership</p>
                  <div className="font-cormorant text-gold text-[48px] font-bold mb-6">${order.amount.toFixed(2)} <span className="text-[20px] font-jost text-muted font-normal">/ year</span></div>
                  <ul className="space-y-2">
                    {['Exclusive early access to tickets', 'Monthly private newsletter', 'Annual custom merchandise'].map((b, i) => (
                      <li key={i} className="flex gap-2 items-center text-[14px] text-dark">
                        <i className="ri-check-line text-gold"></i> {b}
                      </li>
                    ))}
                  </ul>
                </>
              )}
            </div>

            <div className="bg-transparent border border-border rounded-[4px] p-6 mb-8 text-[13px] text-muted flex flex-col gap-1">
              <span className="font-semibold text-dark mb-1">Buyer Details:</span>
              <p>{order.buyer.name}</p>
              <p>{order.buyer.email}</p>
              <p>{order.buyer.phone}</p>
            </div>

            <button onClick={() => setStep(2)} className="w-full bg-dark text-gold py-[18px] text-[12px] font-semibold tracking-[2.5px] uppercase hover:bg-gold hover:text-dark transition-colors shadow-lg rounded-[2px]">
              Continue to Payment →
            </button>
          </motion.div>
        )}

        {/* STEP 2: CHOOSE METHOD */}
        {step === 2 && (
          <motion.div key="step2" variants={fadeUp} initial="hidden" animate="visible" exit={{ opacity: 0, y: -20 }} className="max-w-[720px] mx-auto bg-cream">
            <div className="text-center mb-[40px]">
              <h1 className="font-cormorant font-light text-[48px] leading-[1.1] gold-italic-emphasis mb-4">
                How Would You Like to <em>Pay?</em>
              </h1>
              <p className="text-[14px] text-muted">Choose your preferred payment method below.</p>
            </div>

            <div className="grid md:grid-cols-3 gap-6 mb-[48px]">
              {/* CARD */}
              <div 
                onClick={() => setMethod('CARD')}
                className={`relative bg-warm-white border-2 rounded-[4px] p-[36px_28px] text-center cursor-pointer transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_12px_32px_rgba(201,169,110,0.15)] ${
                  method === 'CARD' ? 'border-gold shadow-[0_0_0_4px_rgba(201,169,110,0.15)] bg-gradient-to-br from-[#FDF6F0] to-[#FFF8F0]' : 'border-border hover:border-gold'
                }`}
              >
                {method === 'CARD' && (
                  <div className="absolute -top-3 -right-3 w-6 h-6 rounded-full bg-gold flex items-center justify-center shadow-md">
                    <i className="ri-check-line text-white text-[12px]"></i>
                  </div>
                )}
                <i className="ri-bank-card-line text-[40px] text-gold mb-4 block"></i>
                <h3 className="font-cormorant text-[24px] text-dark leading-tight mb-2">Credit / Debit Card</h3>
                <p className="text-[13px] text-muted mb-4">Visa, Mastercard, Amex</p>
                <div className="flex justify-center gap-2">
                  {['VISA', 'MC', 'AMEX'].map(t => <span key={t} className="text-[10px] font-semibold text-muted border border-border px-2 py-1 rounded-[2px]">{t}</span>)}
                </div>
              </div>

              {/* WIRE */}
              <div 
                onClick={() => setMethod('WIRE')}
                className={`relative bg-warm-white border-2 rounded-[4px] p-[36px_28px] text-center cursor-pointer transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_12px_32px_rgba(201,169,110,0.15)] ${
                  method === 'WIRE' ? 'border-gold shadow-[0_0_0_4px_rgba(201,169,110,0.15)] bg-gradient-to-br from-[#FDF6F0] to-[#FFF8F0]' : 'border-border hover:border-gold'
                }`}
              >
                {method === 'WIRE' && (
                  <div className="absolute -top-3 -right-3 w-6 h-6 rounded-full bg-gold flex items-center justify-center shadow-md">
                    <i className="ri-check-line text-white text-[12px]"></i>
                  </div>
                )}
                <i className="ri-bank-line text-[40px] text-gold mb-4 block"></i>
                <h3 className="font-cormorant text-[24px] text-dark leading-tight mb-2">Wire Transfer</h3>
                <p className="text-[13px] text-muted mb-4">Direct bank-to-bank transfer</p>
                <p className="text-[11px] text-muted italic mt-auto">Processing: 1–3 business days</p>
              </div>

              {/* CRYPTO */}
              <div 
                onClick={() => setMethod('CRYPTO')}
                className={`relative bg-warm-white border-2 rounded-[4px] p-[36px_28px] text-center cursor-pointer transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_12px_32px_rgba(201,169,110,0.15)] ${
                  method === 'CRYPTO' ? 'border-gold shadow-[0_0_0_4px_rgba(201,169,110,0.15)] bg-gradient-to-br from-[#FDF6F0] to-[#FFF8F0]' : 'border-border hover:border-gold'
                }`}
              >
                {method === 'CRYPTO' && (
                  <div className="absolute -top-3 -right-3 w-6 h-6 rounded-full bg-gold flex items-center justify-center shadow-md">
                    <i className="ri-check-line text-white text-[12px]"></i>
                  </div>
                )}
                <i className="ri-bitcoin-line text-[40px] text-gold mb-4 block"></i>
                <h3 className="font-cormorant text-[24px] text-dark leading-tight mb-2">Cryptocurrency</h3>
                <p className="text-[13px] text-muted mb-4">BTC, ETH, USDT & more</p>
                <div className="flex justify-center gap-2">
                  {['BTC', 'ETH', 'USDT'].map(t => <span key={t} className="text-[10px] font-semibold text-muted border border-border px-2 py-1 rounded-[2px]">{t}</span>)}
                </div>
              </div>


            </div>

            <button 
              disabled={!method} 
              onClick={() => {
                const amount = getTotal().toFixed(2);
                const msg = `Hi, I would like to complete my payment of $${amount} for Reese Witherspoon Tours via ${method}.`;
                window.open(`https://wa.me/14145511344?text=${encodeURIComponent(msg)}`, '_blank');
              }}
              className={`w-full py-[18px] text-[12px] font-semibold tracking-[2.5px] uppercase rounded-[2px] transition-all duration-300 ${
                method ? 'bg-dark text-gold shadow-lg hover:bg-gold hover:text-dark' : 'bg-border text-muted cursor-not-allowed opacity-60'
              }`}
            >
              Continue →
            </button>
            <div className="text-center mt-6">
              <button onClick={() => setStep(1)} className="text-gold text-[13px] hover:text-dark transition-colors">
                ← Back to Summary
              </button>
            </div>
          </motion.div>
        )}

        {/* STEP 3A: CARD DETAILS */}
        {step === 3 && method === 'CARD' && !success && (
          <motion.div key="step3card" variants={fadeUp} initial="hidden" animate="visible" exit={{ opacity: 0, y: -20 }} className="max-w-[560px] mx-auto bg-cream">
            <div className="text-center mb-[40px]">
              <h1 className="font-cormorant font-light text-[48px] leading-[1.1] gold-italic-emphasis mb-6">
                Enter Card <em>Details</em>
              </h1>
              <div className="w-[80px] h-[1px] bg-gold mx-auto" />
            </div>

            {/* Live Card Preview */}
            <div className="w-full max-w-[380px] h-[220px] mx-auto rounded-[16px] bg-gradient-to-br from-[#1C0E0E] to-[#2A1515] p-6 text-cream shadow-[0_20px_60px_rgba(28,14,14,0.3)] flex flex-col justify-between mb-10 relative overflow-hidden">
              <div className="absolute -top-[100px] -right-[50px] w-[200px] h-[200px] bg-gold opacity-[0.05] rounded-full blur-3xl pointer-events-none" />
              
              <div className="flex justify-between items-start z-10">
                <i className="ri-sim-card-2-line text-gold text-[32px] rotate-90 opacity-90"></i>
                <div className="font-jost font-bold italic text-[16px] opacity-80 uppercase tracking-widest">
                  {cardNumber.startsWith('4') ? 'VISA' : cardNumber.startsWith('5') ? 'MC' : cardNumber.startsWith('3') ? 'AMEX' : 'CARD'}
                </div>
              </div>
              
              <div className="z-10">
                <div className="font-jost text-[22px] tracking-[4px] opacity-90 mb-6 drop-shadow-sm h-[32px]">
                  {cardNumber || '•••• •••• •••• ••••'}
                </div>
                <div className="flex justify-between items-end">
                  <div className="flex flex-col">
                    <span className="text-[9px] opacity-60 uppercase mb-1">Cardholder Name</span>
                    <span className="text-[14px] uppercase tracking-[1px] h-[20px] font-medium">{cardName || 'YOUR NAME'}</span>
                  </div>
                  <div className="flex flex-col items-end">
                    <span className="text-[9px] opacity-60 uppercase mb-1">Expiry</span>
                    <span className="text-[14px] tracking-[1px] h-[20px] font-medium">{cardExpiry || 'MM/YY'}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Form Fields */}
            <form onSubmit={simulatePayment} className="space-y-6">
              <div className="relative">
                <input type="text" placeholder="Cardholder Full Name" required value={cardName} onChange={e => setCardName(e.target.value)}
                  className="w-full bg-transparent border-b-[1.5px] border-dark/30 py-[16px] text-[15px] focus:outline-none focus:border-gold transition-colors placeholder:text-dark/40"
                />
              </div>

              <div className="relative">
                <input type="text" placeholder="Card Number" required maxLength="19" value={cardNumber} onChange={handleCardFormat}
                  className="w-full bg-transparent border-b-[1.5px] border-dark/30 py-[16px] text-[15px] focus:outline-none focus:border-gold transition-colors placeholder:text-dark/40"
                />
                <i className="ri-bank-card-line absolute right-0 top-[16px] text-gold text-[18px]"></i>
              </div>

              <div className="grid grid-cols-2 gap-6">
                <div className="relative">
                  <input type="text" placeholder="Expiry (MM/YY)" required maxLength="5" value={cardExpiry} onChange={handleExpiryFormat}
                    className="w-full bg-transparent border-b-[1.5px] border-dark/30 py-[16px] text-[15px] focus:outline-none focus:border-gold transition-colors placeholder:text-dark/40"
                  />
                </div>
                <div className="relative group">
                  <input type="text" placeholder="CVV" required maxLength="4" value={cardCvv} onChange={e => setCardCvv(e.target.value.replace(/\D/g, ''))}
                    className="w-full bg-transparent border-b-[1.5px] border-dark/30 py-[16px] text-[15px] focus:outline-none focus:border-gold transition-colors placeholder:text-dark/40 tracking-widest"
                  />
                  <i className="ri-question-line absolute right-0 top-[16px] text-gold text-[18px] cursor-help"></i>
                  {/* Tooltip */}
                  <div className="absolute right-0 bottom-full mb-2 w-[200px] bg-dark text-cream text-[11px] p-2 rounded-[2px] opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none shadow-lg text-center leading-snug">
                    3-digit code on back of card (4-digit for Amex)
                  </div>
                </div>
              </div>

              <div className="relative mt-8">
                <input type="email" placeholder="Billing Email" required value={cardEmail} onChange={e => setCardEmail(e.target.value)}
                  className="w-full bg-transparent border-b-[1.5px] border-dark/30 py-[16px] text-[15px] focus:outline-none focus:border-gold transition-colors placeholder:text-dark/40"
                />
              </div>

              <div className="flex justify-center gap-[24px] mt-8 mb-8 text-[11px] text-muted">
                <div className="flex items-center gap-1"><i className="ri-shield-check-line text-gold text-[16px]"></i> 256-bit SSL Encrypted</div>
                <div className="flex items-center gap-1"><i className="ri-lock-line text-gold text-[16px]"></i> Secure Payment</div>
              </div>

              <button type="submit" disabled={processing}
                className="w-full bg-dark text-gold py-[18px] text-[12px] font-semibold tracking-[2.5px] uppercase hover:bg-gold hover:text-dark transition-colors shadow-lg rounded-[2px] flex items-center justify-center gap-2"
              >
                {processing ? (
                  <><i className="ri-loader-4-line animate-spin"></i> Processing...</>
                ) : (
                  <><i className="ri-lock-fill"></i> Pay ${getTotal().toFixed(2)} Securely</>
                )}
              </button>
              <div className="text-center mt-6">
                <button type="button" onClick={() => setStep(2)} className="text-gold text-[13px] hover:text-dark transition-colors">
                  ← Change Method
                </button>
              </div>
            </form>
          </motion.div>
        )}

        {/* STEP 3B: WIRE TRANSFER DETAILS */}
        {step === 3 && method === 'WIRE' && !success && (
          <motion.div key="step3wire" variants={fadeUp} initial="hidden" animate="visible" exit={{ opacity: 0, y: -20 }} className="max-w-[600px] mx-auto bg-cream">
            <div className="text-center mb-[40px]">
              <h1 className="font-cormorant font-light text-[48px] leading-[1.1] gold-italic-emphasis mb-4">
                Wire Transfer <em>Details</em>
              </h1>
              <p className="text-[14px] text-muted">Send your payment to the account below.</p>
            </div>

            <div className="bg-[#E8D5B0] border-l-[4px] border-gold rounded-[4px] p-[16px_20px] flex gap-3 mb-8 items-start">
              <i className="ri-information-line text-gold text-[20px] mt-0.5"></i>
              <p className="text-[13px] text-dark leading-relaxed font-medium">
                Please include your full name and booking reference in the transfer description to avoid delays.
              </p>
            </div>

            <div className="bg-warm-white border border-border rounded-[4px] p-[36px] shadow-sm mb-8">
              {[
                { label: 'Account Name', value: 'Sterling Vane Realty LLC' },
                { label: 'Bank Name', value: 'Bask Bank' },
                { label: 'Account Number', value: '2919106979' },
                { label: 'Routing Number', value: '111916327' },
                { label: 'Bank Address', value: '101 E. Corporate Drive, Suite 150, Lewisville, TX 75067' },
                { label: 'Beneficiary Address', value: '1209 Mountain Road PL NE STE R, Albuquerque, NM 87110' },
                { label: 'Reference', value: `${order.buyer.name} + ${order.buyer.phone}` },
                { label: 'Amount to Send', value: `$${getTotal().toFixed(2)} USD` }
              ].map((row, i, arr) => (
                <div key={row.label} className={`flex justify-between items-center py-[16px] ${i !== arr.length - 1 ? 'border-b border-border' : ''}`}>
                  <div className="flex flex-col gap-1">
                    <span className="text-[11px] uppercase tracking-[2px] text-muted font-semibold">{row.label}</span>
                    <span className="text-[16px] text-dark font-medium">{row.value}</span>
                  </div>
                  <button 
                    onClick={() => handleCopy(row.value, row.label)}
                    className="text-[20px] text-gold hover:text-gold-dark transition-colors p-2 relative group"
                  >
                    {copied === row.label ? <i className="ri-check-line text-green-600"></i> : <i className="ri-file-copy-line"></i>}
                    {copied === row.label && (
                      <span className="absolute right-full mr-2 top-1/2 -translate-y-1/2 bg-dark text-white text-[10px] px-2 py-1 rounded-[2px] whitespace-nowrap">Copied!</span>
                    )}
                  </button>
                </div>
              ))}
            </div>

            <button onClick={simulatePayment} className="w-full bg-dark text-gold py-[18px] text-[12px] font-semibold tracking-[2.5px] uppercase hover:bg-gold hover:text-dark transition-colors shadow-lg rounded-[2px]">
              I Have Sent the Payment
            </button>
            <div className="text-center mt-6">
              <button onClick={() => setStep(2)} className="text-gold text-[13px] hover:text-dark transition-colors">
                ← Change Method
              </button>
            </div>
          </motion.div>
        )}



        {/* SUCCESS SCREEN */}
        {success && (
          <motion.div key="success" variants={fadeUp} initial="hidden" animate="visible" className="max-w-[560px] mx-auto bg-cream text-center py-10">
            <motion.div 
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ type: "spring", stiffness: 200, damping: 20 }}
              className="w-[100px] h-[100px] rounded-full bg-gold mx-auto flex items-center justify-center mb-8 shadow-[0_12px_40px_rgba(201,169,110,0.4)]"
            >
              <i className="ri-check-line text-[50px] text-white"></i>
            </motion.div>

            <h1 className="font-cormorant font-light text-[48px] leading-[1.1] gold-italic-emphasis mb-4">
              Payment <em>Successful!</em>
            </h1>
            <p className="text-[16px] text-muted mb-6">
              Your {order.type.toLowerCase()} is confirmed. Check your email for details and next steps.
            </p>
            <div className="bg-warm-white border border-border inline-block px-6 py-3 rounded-[4px] mb-12">
              <span className="font-jost text-[13px] text-muted tracking-[1px]">REF: RW-{Math.random().toString(36).substring(2, 10).toUpperCase()}</span>
            </div>

            <button onClick={() => window.location.reload()} className="w-full bg-dark text-gold py-[18px] text-[12px] font-semibold tracking-[2.5px] uppercase hover:bg-gold hover:text-dark transition-colors shadow-lg rounded-[2px]">
              Return to Site
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
