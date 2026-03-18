import React, { useEffect, useState } from 'react';
import { motion } from 'motion/react';
import { getHistory } from '../lib/supabase';
import { Loader2, Calendar, ChevronRight, ArrowLeft } from 'lucide-react';

interface HistoryScreenProps {
  userId: string;
  onBack: () => void;
  onSelectGeneration: (data: any) => void;
}

export function HistoryScreen({ userId, onBack, onSelectGeneration }: HistoryScreenProps) {
  const [history, setHistory] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchHistory = async () => {
      const data = await getHistory(userId);
      setHistory(data);
      setLoading(false);
    };
    fetchHistory();
  }, [userId]);

  return (
    <motion.div 
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      className="w-full max-w-4xl mx-auto"
    >
      <div className="flex items-center gap-4 mb-8">
        <button 
          onClick={onBack}
          className="p-2 rounded-full hover:bg-white/10 text-white/50 hover:text-white transition-colors"
        >
          <ArrowLeft className="w-6 h-6" />
        </button>
        <div>
          <h2 className="font-serif text-3xl sm:text-4xl text-white/90">Banco de Dados</h2>
          <p className="text-white/50 font-light">Seu histórico de calendários gerados.</p>
        </div>
      </div>

      {loading ? (
        <div className="flex items-center justify-center h-64">
          <Loader2 className="w-8 h-8 text-[#d4af37] animate-spin" />
        </div>
      ) : history.length === 0 ? (
        <div className="text-center py-20 bg-white/5 rounded-3xl border border-white/10">
          <Calendar className="w-12 h-12 text-white/20 mx-auto mb-4" />
          <h3 className="text-xl font-serif text-white/70 mb-2">Nenhum calendário gerado</h3>
          <p className="text-white/40">Seus calendários salvos aparecerão aqui.</p>
        </div>
      ) : (
        <div className="grid gap-4">
          {history.map((item) => (
            <button
              key={item.id || item.created_at}
              onClick={() => onSelectGeneration(item.data)}
              className="glass-panel p-6 rounded-2xl hover:bg-white/10 transition-all text-left flex items-center justify-between group border border-white/5 hover:border-[#d4af37]/50"
            >
              <div>
                <h4 className="text-lg font-serif text-white/90 group-hover:text-[#d4af37] transition-colors">
                  Calendário de 30 Dias
                </h4>
                <p className="text-white/40 text-sm mt-1">
                  {new Date(item.created_at).toLocaleDateString('pt-BR', {
                    day: '2-digit',
                    month: 'long',
                    year: 'numeric',
                    hour: '2-digit',
                    minute: '2-digit'
                  })}
                </p>
              </div>
              <ChevronRight className="w-5 h-5 text-white/20 group-hover:text-[#d4af37] transition-colors" />
            </button>
          ))}
        </div>
      )}
    </motion.div>
  );
}
