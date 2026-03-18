import React from 'react';
import { motion } from 'motion/react';
import { X, Check, Lock, Zap } from 'lucide-react';

interface PaywallModalProps {
  onClose: () => void;
  onSuccess: (type: 'single' | 'monthly') => void;
}

export function PaywallModal({ onClose, onSuccess }: PaywallModalProps) {
  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center p-4 sm:p-6 bg-black/80 backdrop-blur-md">
      <motion.div
        initial={{ scale: 0.95, opacity: 0, y: 20 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.95, opacity: 0, y: 20 }}
        className="glass-panel w-full max-w-4xl rounded-3xl border border-white/10 shadow-2xl relative overflow-hidden bg-[#1a0b1c]"
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
            Desbloqueie seu mês completo
          </h2>
          <p className="text-white/60 font-light text-lg mb-10">
            Escolha o melhor plano para o seu negócio e tenha acesso a todo o conteúdo gerado.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8 text-left">
            {/* Monthly Option */}
            <div 
              onClick={() => onSuccess('monthly')}
              className="relative border-2 border-[#d4af37] bg-gradient-to-b from-[#d4af37]/10 to-transparent rounded-2xl p-8 cursor-pointer hover:from-[#d4af37]/20 transition-all group"
            >
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-[#d4af37] text-black text-xs font-bold uppercase tracking-wider py-1 px-4 rounded-full shadow-lg shadow-[#d4af37]/30">
                Recomendado
              </div>
              <h3 className="text-2xl font-medium text-white/90 mb-2">Assinatura Mensal</h3>
              <div className="flex items-baseline gap-1 mb-6">
                <span className="text-4xl font-bold text-[#d4af37]">R$ 9,90</span>
                <span className="text-white/50 text-sm">/mês</span>
              </div>
              <ul className="space-y-4 text-sm text-white/80 mb-8">
                <li className="flex items-start gap-3"><Check className="w-5 h-5 text-[#d4af37] shrink-0" /> Desbloqueia 30 dias todo mês</li>
                <li className="flex items-start gap-3"><Check className="w-5 h-5 text-[#d4af37] shrink-0" /> Acesso ao histórico completo</li>
                <li className="flex items-start gap-3"><Check className="w-5 h-5 text-[#d4af37] shrink-0" /> Cancele quando quiser</li>
              </ul>
              <button className="w-full py-4 bg-[#d4af37] text-black rounded-xl font-bold text-lg group-hover:bg-[#e6c258] transition-colors flex items-center justify-center gap-2 shadow-[0_0_20px_rgba(212,175,55,0.2)]">
                <Zap className="w-5 h-5" />
                Assinar Agora
              </button>
            </div>

            {/* Single Option */}
            <div 
              onClick={() => onSuccess('single')}
              className="border border-white/20 bg-white/5 rounded-2xl p-8 cursor-pointer hover:bg-white/10 transition-all flex flex-col justify-between"
            >
              <div>
                <h3 className="text-2xl font-medium text-white/90 mb-2">Desbloqueio Avulso</h3>
                <div className="flex items-baseline gap-1 mb-6">
                  <span className="text-4xl font-bold text-white">R$ 19,90</span>
                  <span className="text-white/50 text-sm">/único</span>
                </div>
                <ul className="space-y-4 text-sm text-white/70 mb-8">
                  <li className="flex items-start gap-3"><Check className="w-5 h-5 text-white/50 shrink-0" /> Desbloqueia apenas este plano</li>
                  <li className="flex items-start gap-3"><Check className="w-5 h-5 text-white/50 shrink-0" /> Pagamento único, sem renovação</li>
                </ul>
              </div>
              <button className="w-full py-4 border border-white/20 text-white rounded-xl font-bold text-lg hover:bg-white/10 transition-colors">
                Liberar 30 Dias
              </button>
            </div>
          </div>
          
          <p className="text-center text-xs text-white/40">Pagamento 100% seguro. Acesso imediato após a confirmação.</p>
        </div>
      </motion.div>
    </div>
  );
}
