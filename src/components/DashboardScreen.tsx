import React from 'react';
import { motion } from 'motion/react';
import { Crown, Plus, Calendar, Star, Zap } from 'lucide-react';

interface DashboardScreenProps {
  userPlan: 'free' | 'paid' | 'unlimited' | 'subscriber' | 'lifetime';
  onGenerateNew: () => void;
  onViewHistory: () => void;
  onSubscribe: () => void;
}

export function DashboardScreen({ userPlan, onGenerateNew, onViewHistory, onSubscribe }: DashboardScreenProps) {
  
  const planNames = {
    free: 'Plano Gratuito',
    paid: 'Plano Básico (30 Dias)',
    unlimited: 'Acesso Ilimitado',
    subscriber: 'Assinatura Mensal',
    lifetime: 'Acesso Vitalício'
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-4xl mx-auto w-full space-y-8"
    >
      <h2 className="text-3xl font-serif text-white/90 mb-8">Meu Painel</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
        <div className="glass-panel p-8 rounded-3xl border border-white/10 flex flex-col justify-center">
          <h3 className="text-white/50 text-sm uppercase tracking-wider mb-2">Plano Atual</h3>
          <div className="flex items-center gap-3">
            {userPlan !== 'free' && <Crown className="w-6 h-6 text-[#d4af37]" />}
            <p className="text-3xl font-medium text-[#d4af37]">
              {planNames[userPlan]}
            </p>
          </div>
          {userPlan === 'free' && (
            <p className="text-white/50 text-sm mt-2">Gere um plano para ver as opções de desbloqueio.</p>
          )}
        </div>

        <div className="glass-panel bg-gradient-to-br from-[#d4af37]/10 to-purple-900/10 border border-[#d4af37]/20 p-8 rounded-3xl flex flex-col justify-center items-start">
          <h3 className="text-white/90 font-medium mb-2 text-lg">Pronto para criar?</h3>
          <p className="text-white/60 text-sm mb-6">Sua audiência está esperando por conteúdo novo e magnético.</p>
          <button 
            onClick={onGenerateNew}
            className="w-full py-4 bg-[#d4af37] text-black rounded-xl font-bold hover:bg-[#e6c258] transition-colors flex items-center justify-center gap-2"
          >
            <Plus className="w-5 h-5" />
            Gerar Novo Plano
          </button>
        </div>
      </div>

      <div className="glass-panel p-8 rounded-3xl border border-white/10">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h3 className="text-xl font-medium text-white/90">Conteúdos Salvos</h3>
            <p className="text-white/50 text-sm">Acesse seus planos gerados anteriormente.</p>
          </div>
          <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center">
            <Calendar className="w-6 h-6 text-white/70" />
          </div>
        </div>
        <button 
          onClick={onViewHistory}
          className="w-full py-4 border border-white/20 hover:bg-white/10 text-white rounded-xl font-bold transition-all flex items-center justify-center gap-2"
        >
          Acessar Meu Histórico
        </button>
      </div>
    </motion.div>
  );
}
