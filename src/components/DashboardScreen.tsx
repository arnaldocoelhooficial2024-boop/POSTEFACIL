import React from 'react';
import { motion } from 'motion/react';
import { Crown, Plus, Calendar, Star } from 'lucide-react';

interface DashboardScreenProps {
  userPlan: 'free' | 'paid' | 'unlimited' | 'subscriber';
  onGenerateNew: () => void;
  onViewHistory: () => void;
  onSubscribe: () => void;
}

export function DashboardScreen({ userPlan, onGenerateNew, onViewHistory, onSubscribe }: DashboardScreenProps) {
  
  const planNames = {
    free: 'Plano Gratuito',
    paid: 'Plano Básico (1 Mês)',
    unlimited: 'Acesso Ilimitado',
    subscriber: 'Assinante Premium'
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-4xl mx-auto w-full space-y-8"
    >
      <div className="glass-panel p-8 rounded-3xl border border-white/10 flex flex-col sm:flex-row items-center justify-between gap-6">
        <div className="flex items-center gap-6">
          <div className="w-16 h-16 bg-[#d4af37]/20 rounded-full flex items-center justify-center shrink-0">
            <Crown className="w-8 h-8 text-[#d4af37]" />
          </div>
          <div>
            <h2 className="text-2xl font-serif text-white/90 mb-1">Seu Plano Atual</h2>
            <p className="text-[#d4af37] font-medium tracking-wide uppercase text-sm">
              {planNames[userPlan]}
            </p>
          </div>
        </div>
        
        <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
          <button 
            onClick={onViewHistory}
            className="btn-premium-outline px-6 py-3 rounded-xl flex items-center justify-center gap-2"
          >
            <Calendar className="w-4 h-4" /> Meu Histórico
          </button>
          <button 
            onClick={onGenerateNew}
            className="btn-premium px-6 py-3 rounded-xl flex items-center justify-center gap-2"
          >
            <Plus className="w-4 h-4" /> Gerar Novo Plano
          </button>
        </div>
      </div>

      {userPlan !== 'subscriber' && (
        <div className="glass-panel p-8 rounded-3xl border border-[#d4af37]/30 bg-gradient-to-br from-[#d4af37]/10 to-transparent relative overflow-hidden">
          <div className="absolute top-0 right-0 p-6 opacity-10 pointer-events-none">
            <Star className="w-32 h-32 text-[#d4af37]" />
          </div>
          <div className="relative z-10 max-w-2xl">
            <h3 className="text-2xl font-serif text-white/90 mb-3">
              Tenha novos planos automaticamente todos os meses
            </h3>
            <p className="text-white/70 mb-6">
              Assine o Premium por apenas <strong>R$ 14,90/mês</strong> e garanta:
            </p>
            <ul className="space-y-3 mb-8">
              <li className="flex items-center gap-3 text-white/80">
                <div className="w-1.5 h-1.5 rounded-full bg-[#d4af37]" />
                Gerar 30 novos posts todo mês
              </li>
              <li className="flex items-center gap-3 text-white/80">
                <div className="w-1.5 h-1.5 rounded-full bg-[#d4af37]" />
                Acesso completo ao histórico
              </li>
              <li className="flex items-center gap-3 text-white/80">
                <div className="w-1.5 h-1.5 rounded-full bg-[#d4af37]" />
                Facilidade contínua sem precisar pagar por plano avulso
              </li>
            </ul>
            <button 
              onClick={onSubscribe}
              className="btn-premium px-8 py-3 rounded-xl shadow-lg shadow-[#d4af37]/20"
            >
              Assinar por R$ 14,90/mês
            </button>
          </div>
        </div>
      )}
    </motion.div>
  );
}
