import React from 'react';
import { motion } from 'motion/react';
import { Crown, Check, ArrowRight } from 'lucide-react';

interface UpsellModalProps {
  onAccept: () => void;
  onDecline: () => void;
}

export function UpsellModal({ onAccept, onDecline }: UpsellModalProps) {
  return (
    <div className="fixed inset-0 z-[210] overflow-y-auto bg-black/90 backdrop-blur-md">
      <div className="min-h-full flex items-center justify-center p-4 sm:p-6">
        <motion.div
          initial={{ scale: 0.95, opacity: 0, y: 20 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          className="glass-panel w-full max-w-lg rounded-3xl border border-[#d4af37]/30 shadow-2xl shadow-[#d4af37]/10 relative overflow-hidden bg-[#1a0b1c]"
        >
        <div className="absolute inset-0 bg-gradient-to-b from-[#d4af37]/10 to-transparent pointer-events-none" />
        
        <div className="p-8 sm:p-10 text-center relative z-10">
          <div className="w-16 h-16 bg-gradient-to-br from-[#d4af37] to-[#e6c258] rounded-full flex items-center justify-center mx-auto mb-6 shadow-[0_0_30px_rgba(212,175,55,0.3)]">
            <Crown className="w-8 h-8 text-black" />
          </div>
          
          <h2 className="text-3xl font-serif text-white/90 mb-4">
            Espere! Leve o M.C.L.
          </h2>
          
          <p className="text-white/70 font-light mb-8 text-lg">
            Você está prestes a pagar R$ 19,90 por apenas 30 dias. Por uma pequena diferença, você pode ter <strong className="text-[#d4af37]">acesso ao M.C.L. (Método Calendário Lucrativo)</strong>.
          </p>

          <div className="bg-white/5 border border-[#d4af37]/30 rounded-2xl p-6 mb-8 text-left">
            <div className="flex justify-between items-center mb-6 pb-6 border-b border-white/10">
              <div>
                <h3 className="text-xl font-medium text-[#d4af37]">M.C.L.</h3>
                <p className="text-white/50 text-sm">Método Calendário Lucrativo</p>
              </div>
              <div className="text-right">
                <div className="text-sm text-white/40 line-through">R$ 199,90</div>
                <div className="text-3xl font-bold text-white">R$ 49,90</div>
              </div>
            </div>
            
            <ul className="space-y-4">
              <li className="flex items-center gap-3">
                <div className="w-6 h-6 rounded-full bg-[#d4af37]/20 flex items-center justify-center shrink-0">
                  <Check className="w-4 h-4 text-[#d4af37]" />
                </div>
                <span className="text-white/90 text-sm">Acesso completo ao método M.C.L.</span>
              </li>
              <li className="flex items-center gap-3">
                <div className="w-6 h-6 rounded-full bg-[#d4af37]/20 flex items-center justify-center shrink-0">
                  <Check className="w-4 h-4 text-[#d4af37]" />
                </div>
                <span className="text-white/90 text-sm">Geração de planos ilimitada</span>
              </li>
              <li className="flex items-center gap-3">
                <div className="w-6 h-6 rounded-full bg-[#d4af37]/20 flex items-center justify-center shrink-0">
                  <Check className="w-4 h-4 text-[#d4af37]" />
                </div>
                <span className="text-white/90 text-sm">Acesso vitalício ao histórico</span>
              </li>
            </ul>
          </div>

          <div className="space-y-4">
            <button 
              onClick={onAccept}
              className="w-full py-4 bg-gradient-to-r from-[#d4af37] to-[#e6c258] text-black rounded-xl font-bold text-lg hover:opacity-90 transition-opacity flex items-center justify-center gap-2 shadow-[0_0_20px_rgba(212,175,55,0.4)]"
            >
              Quero o M.C.L. por R$ 49,90
              <ArrowRight className="w-5 h-5" />
            </button>
            
            <button 
              onClick={onDecline}
              className="w-full py-4 text-white/50 hover:text-white text-sm transition-colors"
            >
              Não, obrigado. Quero apenas os 30 dias por R$ 19,90.
            </button>
          </div>
        </div>
        </motion.div>
      </div>
    </div>
  );
}
