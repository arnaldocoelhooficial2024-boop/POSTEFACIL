import React from 'react';
import { motion } from 'motion/react';
import { Sparkles, ArrowRight } from 'lucide-react';

interface UpsellModalProps {
  onAccept: () => void;
  onDecline: () => void;
}

export function UpsellModal({ onAccept, onDecline }: UpsellModalProps) {
  return (
    <div className="fixed inset-0 z-[210] flex items-center justify-center p-4 sm:p-6 bg-black/90 backdrop-blur-md">
      <motion.div
        initial={{ scale: 0.95, opacity: 0, y: 20 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        className="glass-panel w-full max-w-lg rounded-3xl border border-[#d4af37]/30 shadow-2xl shadow-[#d4af37]/10 relative overflow-hidden bg-[#1a0b1c]"
      >
        <div className="absolute inset-0 bg-gradient-to-b from-[#d4af37]/10 to-transparent pointer-events-none" />
        
        <div className="p-8 sm:p-10 text-center relative z-10">
          <div className="w-16 h-16 bg-[#d4af37]/20 rounded-full flex items-center justify-center mx-auto mb-6">
            <Sparkles className="w-8 h-8 text-[#d4af37]" />
          </div>
          
          <h2 className="text-3xl font-serif text-white/90 mb-4">
            Aproveite essa oferta especial
          </h2>
          
          <p className="text-white/70 font-light mb-8 text-lg">
            Gere novos planos ilimitados sempre que quiser, para promoções, datas especiais e novos serviços.
          </p>

          <div className="space-y-4">
            <button 
              onClick={onAccept}
              className="btn-premium w-full py-4 rounded-xl text-lg shadow-lg shadow-[#d4af37]/20 flex items-center justify-center gap-2"
            >
              Adicionar por R$ 29,90 <ArrowRight className="w-5 h-5" />
            </button>
            
            <button 
              onClick={onDecline}
              className="w-full py-4 text-white/50 hover:text-white text-sm transition-colors"
            >
              Continuar apenas com o básico
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
