import React from 'react';
import { motion } from 'motion/react';
import { X, Check, Lock } from 'lucide-react';

interface PaywallModalProps {
  onClose: () => void;
  onBuyBasic: () => void;
}

export function PaywallModal({ onClose, onBuyBasic }: PaywallModalProps) {
  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center p-4 sm:p-6 bg-black/80 backdrop-blur-md">
      <motion.div
        initial={{ scale: 0.95, opacity: 0, y: 20 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.95, opacity: 0, y: 20 }}
        className="glass-panel w-full max-w-2xl rounded-3xl border border-white/10 shadow-2xl relative overflow-hidden bg-[#1a0b1c]"
      >
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-full hover:bg-white/10 text-white/50 hover:text-white transition-colors z-10"
        >
          <X className="w-6 h-6" />
        </button>

        <div className="p-8 sm:p-12 text-center relative z-10">
          <Lock className="w-12 h-12 text-[#d4af37] mx-auto mb-6" />
          <h2 className="text-3xl sm:text-4xl font-serif text-white/90 mb-2">
            Seu plano completo de 30 dias está pronto
          </h2>
          <p className="text-white/60 font-light text-lg mb-8">
            Desbloqueie agora e comece a postar hoje
          </p>

          <div className="bg-white/5 border border-white/10 rounded-2xl p-6 sm:p-8 mb-8 text-left">
            <div className="mb-6 pb-6 border-b border-white/10">
              <span className="inline-block px-3 py-1 bg-[#d4af37]/20 text-[#d4af37] text-xs font-bold uppercase tracking-widest rounded-full mb-4">
                Valor Percebido
              </span>
              <p className="text-white/80">
                Agências cobrariam <strong className="text-white">R$ 300+</strong> por este planejamento estratégico. Aqui você tem acesso imediato por uma fração do valor.
              </p>
            </div>

            <ul className="space-y-4">
              <li className="flex items-start gap-3 text-white/70">
                <Check className="w-5 h-5 text-[#d4af37] shrink-0" />
                <span>Acesso completo aos <strong>30 dias</strong> de conteúdo.</span>
              </li>
              <li className="flex items-start gap-3 text-white/70">
                <Check className="w-5 h-5 text-[#d4af37] shrink-0" />
                <span>Roteiros de vídeo prontos para gravar.</span>
              </li>
              <li className="flex items-start gap-3 text-white/70">
                <Check className="w-5 h-5 text-[#d4af37] shrink-0" />
                <span>Legendas persuasivas focadas em conversão.</span>
              </li>
            </ul>
          </div>

          <button 
            onClick={onBuyBasic}
            className="btn-premium w-full py-4 rounded-xl text-lg shadow-lg shadow-[#d4af37]/20"
          >
            Liberar agora por R$ 19,90
          </button>
        </div>
      </motion.div>
    </div>
  );
}
