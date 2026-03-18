import React, { useState, useRef, useEffect } from 'react';
import { GoogleGenAI, Type } from '@google/genai';
import { Sparkles, Loader2, Calendar, Copy, Check, LogOut, Mail, Lock, User, ArrowRight, X, Video, Image as ImageIcon, FileText, Smartphone, ChevronRight, ChevronLeft, Instagram, Target, Star } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { motion, AnimatePresence } from 'motion/react';
import { PaywallModal } from './components/PaywallModal';
import { UpsellModal } from './components/UpsellModal';
import { HistoryScreen } from './components/HistoryScreen';
import { DashboardScreen } from './components/DashboardScreen';
import { Logo } from './components/Logo';
import { saveToHistory } from './lib/supabase';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// --- Types & Constants ---

interface BriefingData {
  nome: string;
  instagram: string;
  nicho: string[];
  diferencial: string;
  publico: string;
}

interface DayContent {
  day: number;
  postType: string;
  title: string;
  visualConcept: string;
  videoScript?: string;
  caption: string;
  hashtags: string;
}

const INITIAL_BRIEFING_DATA: BriefingData = {
  nome: '',
  instagram: '',
  nicho: [],
  diferencial: '',
  publico: '',
};

const NICHOS = [
  'Salão de Beleza (Geral)',
  'Especialista em Loiros/Colorimetria',
  'Estética Facial (Botox, Preenchimento)',
  'Estética Corporal (Massagem, Medidas)',
  'Manicure / Nail Designer',
  'Design de Sobrancelhas / Cílios',
  'Maquiagem Profissional',
  'Clínica Dermatológica',
  'Spa / Bem-estar',
  'Outro'
];

// --- Components ---

function AuthScreen({ onLogin }: { onLogin: () => void }) {
  const [isRegister, setIsRegister] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulating login/register since Firebase was declined
    onLogin();
  };

  return (
    <div className="min-h-screen relative flex overflow-hidden bg-[#0c0510]">
      {/* Full Background Image */}
      <div className="absolute inset-0 z-0">
        <img 
          src="https://images.unsplash.com/photo-1616394584738-fc6e612e71b9?q=80&w=2070&auto=format&fit=crop" 
          alt="Luxury Beauty Background" 
          className="w-full h-full object-cover opacity-40 lg:opacity-70"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-[#0c0510]/60 lg:bg-gradient-to-r lg:from-[#0c0510]/90 lg:via-[#0c0510]/60 lg:to-[#0c0510]/90" />
      </div>

      {/* Bidirectional Content */}
      <div className="relative z-10 flex w-full">
        
        {/* Left Side: Branding (Hidden on mobile) */}
        <div className="hidden lg:flex flex-col justify-center w-1/2 p-16 lg:p-24 text-white">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <Logo size="lg" className="mb-8" />
            <p className="text-lg xl:text-xl font-light text-white/70 max-w-lg leading-relaxed mt-6">
              A inteligência artificial a favor da sua beleza. Crie conteúdos magnéticos e atraia um público premium para o seu negócio.
            </p>
          </motion.div>
        </div>

        {/* Right Side: Auth Form */}
        <div className="w-full lg:w-1/2 flex items-center justify-center p-6 sm:p-12 lg:p-16 bg-transparent lg:bg-[#0c0510]/40 lg:backdrop-blur-xl lg:border-l lg:border-white/10 shadow-2xl">
          <div className="w-full max-w-md">
            {/* Mobile Header (Visible only on small screens) */}
            <div className="lg:hidden flex justify-center mb-10">
              <Logo size="md" />
            </div>

            <div className="relative">
              <AnimatePresence mode="wait">
                <motion.div
                  key={isRegister ? 'register' : 'login'}
                  initial={{ opacity: 0, x: isRegister ? 40 : -40 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: isRegister ? -40 : 40 }}
                  transition={{ duration: 0.4, ease: "anticipate" }}
                >
                  <h2 className="font-serif text-3xl mb-3 text-white">
                    {isRegister ? 'Criar Conta' : 'Bem-vindo'}
                  </h2>
                  <p className="text-white/50 text-sm mb-10">
                    {isRegister 
                      ? 'Junte-se à elite dos profissionais da beleza.' 
                      : 'Acesse seu painel estratégico exclusivo.'}
                  </p>

                  <form onSubmit={handleSubmit} className="space-y-5">
                    {isRegister && (
                      <div className="relative">
                        <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/40" />
                        <input
                          type="text"
                          placeholder="Nome completo"
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                          className="input-premium"
                          style={{ paddingLeft: '3rem' }}
                          required={isRegister}
                        />
                      </div>
                    )}

                    <div className="relative">
                      <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/40" />
                      <input
                        type="email"
                        placeholder="E-mail"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="input-premium"
                        style={{ paddingLeft: '3rem' }}
                        required
                      />
                    </div>

                    <div className="relative">
                      <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/40" />
                      <input
                        type="password"
                        placeholder="Senha"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="input-premium"
                        style={{ paddingLeft: '3rem' }}
                        required
                      />
                    </div>

                    <div className="pt-6 space-y-4">
                      <button type="submit" className="btn-premium rounded-xl w-full">
                        {isRegister ? 'Registrar' : 'Entrar'} <ArrowRight className="w-4 h-4 ml-2" />
                      </button>
                      
                      <div className="relative flex items-center py-2">
                        <div className="flex-grow border-t border-white/10"></div>
                        <span className="flex-shrink-0 mx-4 text-white/30 text-xs uppercase tracking-widest">Ou</span>
                        <div className="flex-grow border-t border-white/10"></div>
                      </div>

                      <button type="button" onClick={handleSubmit} className="btn-premium-outline rounded-xl w-full flex justify-center items-center">
                        <svg className="w-4 h-4 mr-2" viewBox="0 0 24 24">
                          <path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                          <path fill="currentColor" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                          <path fill="currentColor" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                          <path fill="currentColor" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
                        </svg>
                        Continuar com Google
                      </button>
                    </div>
                  </form>

                  <div className="mt-8 text-center">
                    <button 
                      onClick={() => setIsRegister(!isRegister)}
                      className="text-white/50 hover:text-white text-sm transition-colors"
                    >
                      {isRegister 
                        ? 'Já possui uma conta? Faça login.' 
                        : 'Ainda não tem acesso? Solicite um convite.'}
                    </button>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function CopyButton({ text, label }: { text: string, label: string }) {
  const [copied, setCopied] = useState(false);
  const handleCopy = () => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };
  return (
    <button
      onClick={handleCopy}
      className="flex items-center gap-2 px-3 py-1.5 text-xs uppercase tracking-widest font-semibold text-white/60 hover:text-white hover:bg-white/5 transition-colors border border-white/10 rounded-lg"
    >
      {copied ? <Check className="w-3 h-3 text-green-400" /> : <Copy className="w-3 h-3" />}
      {copied ? 'Copiado' : label}
    </button>
  );
}

type UserPlan = 'free' | 'paid' | 'unlimited' | 'subscriber' | 'lifetime';

function PlannerScreen({ userId, onLogout }: { userId: string, onLogout: () => void }) {
  const [briefing, setBriefing] = useState<BriefingData>(INITIAL_BRIEFING_DATA);
  const [currentStep, setCurrentStep] = useState(0);
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedDays, setGeneratedDays] = useState<DayContent[] | null>(null);
  const [selectedDay, setSelectedDay] = useState<DayContent | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [showPaywall, setShowPaywall] = useState(false);
  const [showUpsell, setShowUpsell] = useState(false);
  const [userPlan, setUserPlan] = useState<UserPlan>('free');
  const [viewMode, setViewMode] = useState<'generator' | 'history' | 'dashboard'>('generator');
  const resultRef = useRef<HTMLDivElement>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setBriefing((prev) => ({ ...prev, [name]: value }));
  };

  const handleNichoSelect = (nicho: string) => {
    setBriefing((prev) => {
      if (prev.nicho.includes(nicho)) {
        return { ...prev, nicho: prev.nicho.filter(n => n !== nicho) };
      }
      return { ...prev, nicho: [...prev.nicho, nicho] };
    });
  };

  const nextStep = () => {
    if (currentStep < 3) setCurrentStep(prev => prev + 1);
  };

  const prevStep = () => {
    if (currentStep > 0) setCurrentStep(prev => prev - 1);
  };

  const generatePrompt = (data: BriefingData) => `
Aja como um Copywriter Sênior altamente experiente de uma agência de marketing de alta performance.
Seu cliente é um negócio da área da beleza e precisa de um calendário de conteúdo de 30 dias focado em conversão e autoridade.

CONTEXTO DO CLIENTE (BRIEFING):
Nome do Negócio: ${data.nome}
Instagram: ${data.instagram || 'Não informado'}
Nicho/Especialidade: ${data.nicho.join(', ')}
Diferencial (O que os torna únicos): ${data.diferencial || 'Atendimento de alta qualidade e resultados comprovados.'}
Público-Alvo (Cliente ideal): ${data.publico || 'Pessoas que buscam serviços de beleza premium.'}

REGRAS DE OURO:
1. Seja simples, direto e altamente persuasivo. A pessoa precisa apenas copiar e colar.
2. Para vídeos (Reels/Stories), crie um roteiro (script) muito fácil de lembrar e gravar usando apenas o celular. Fale diretamente com o "${data.publico}".
3. Não invente nomes de protocolos complexos. Use a linguagem do dia a dia, mas com tom premium e valorizando o "${data.diferencial}".
4. Entregue o conteúdo estruturado para 30 dias exatos (1 a 30).
5. Inclua hashtags estratégicas no final da legenda.
6. Alterne os tipos de post (Ex: Reel de Autoridade, Foto de Resultado, Carrossel Educativo, Story de Bastidor, Reel de Oferta).
`;

  const handleGenerate = async () => {
    setIsGenerating(true);
    setError(null);
    setGeneratedDays(null);
    setCurrentStep(4); // Loading step

    try {
      const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
      const prompt = generatePrompt(briefing);

      const response = await ai.models.generateContent({
        model: 'gemini-3.1-pro-preview',
        contents: prompt,
        config: {
          responseMimeType: "application/json",
          responseSchema: {
            type: Type.ARRAY,
            items: {
              type: Type.OBJECT,
              properties: {
                day: { type: Type.INTEGER, description: "Número do dia (1 a 30)" },
                postType: { type: Type.STRING, description: "Ex: Reel, Foto, Carrossel, Story" },
                title: { type: Type.STRING, description: "Título chamativo do post" },
                visualConcept: { type: Type.STRING, description: "O que mostrar na imagem/vídeo de forma simples" },
                videoScript: { type: Type.STRING, description: "Roteiro falado. Simples e curto para gravar no celular. Vazio se não for vídeo." },
                caption: { type: Type.STRING, description: "Legenda do post com CTA persuasivo" },
                hashtags: { type: Type.STRING, description: "Hashtags relevantes" }
              },
              required: ["day", "postType", "title", "visualConcept", "caption", "hashtags"]
            }
          }
        }
      });

      let jsonStr = response.text;
      if (jsonStr) {
        // Sanitização robusta para evitar erros de parse se a IA retornar markdown
        jsonStr = jsonStr.replace(/```json/gi, '').replace(/```/gi, '').trim();
        const days = JSON.parse(jsonStr);
        setGeneratedDays(days);
        setCurrentStep(5); // Result step
        
        // Save to history
        await saveToHistory(userId, days);
      } else {
        throw new Error("Resposta vazia da IA.");
      }

      setTimeout(() => {
        resultRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 100);

    } catch (err: any) {
      console.error("Error generating content:", err);
      setError("Ocorreu um erro ao gerar o conteúdo. Por favor, tente novamente.");
      setCurrentStep(3); // Go back to last step on error
    } finally {
      setIsGenerating(false);
    }
  };

  // Renderização dos passos do Quiz
  const renderQuizStep = () => {
    switch (currentStep) {
      case 0:
        return (
          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-8">
            <div className="text-center space-y-4">
              <div className="w-16 h-16 bg-white/5 border border-white/10 rounded-full flex items-center justify-center mx-auto mb-6">
                <User className="w-8 h-8 text-[#d4af37]" />
              </div>
              <h2 className="font-serif text-3xl sm:text-4xl text-white/90">Identidade da Marca</h2>
              <p className="text-white/50 font-light">Como seus clientes conhecem você?</p>
            </div>
            <div className="space-y-6 max-w-md mx-auto">
              <div className="space-y-2">
                <label className="text-xs uppercase tracking-widest text-white/40 font-semibold">Nome do Negócio / Profissional</label>
                <input type="text" name="nome" value={briefing.nome} onChange={handleInputChange} placeholder="Ex: Maison Blanc ou Dra. Ana Silva" className="input-premium text-lg py-4" autoFocus />
              </div>
              <div className="space-y-2">
                <label className="text-xs uppercase tracking-widest text-white/40 font-semibold flex items-center gap-2"><Instagram className="w-4 h-4" /> Perfil do Instagram (Opcional)</label>
                <input type="text" name="instagram" value={briefing.instagram} onChange={handleInputChange} placeholder="Ex: @maisonblanc" className="input-premium text-lg py-4" />
              </div>
              <button onClick={nextStep} disabled={!briefing.nome.trim()} className={cn("btn-premium w-full py-4 rounded-xl mt-8", !briefing.nome.trim() && "opacity-50 cursor-not-allowed")}>
                Próximo Passo <ArrowRight className="w-5 h-5" />
              </button>
            </div>
          </motion.div>
        );
      case 1:
        return (
          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-8">
            <div className="text-center space-y-4">
              <div className="w-16 h-16 bg-white/5 border border-white/10 rounded-full flex items-center justify-center mx-auto mb-6">
                <Target className="w-8 h-8 text-[#d4af37]" />
              </div>
              <h2 className="font-serif text-3xl sm:text-4xl text-white/90">Sua Especialidade</h2>
              <p className="text-white/50 font-light">Qual é o foco principal do seu negócio?</p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-w-2xl mx-auto">
              {NICHOS.map((n) => (
                <button key={n} onClick={() => handleNichoSelect(n)} className={cn("p-4 rounded-xl border text-left transition-all", briefing.nicho.includes(n) ? "bg-[#d4af37]/10 border-[#d4af37] text-[#d4af37]" : "bg-white/5 border-white/10 text-white/70 hover:bg-white/10 hover:border-white/20")}>
                  {n}
                </button>
              ))}
            </div>
            <div className="flex items-center justify-between max-w-2xl mx-auto mt-8">
              <button onClick={prevStep} className="text-white/50 hover:text-white flex items-center gap-2 px-4 py-2"><ChevronLeft className="w-4 h-4" /> Voltar</button>
              <button onClick={nextStep} disabled={briefing.nicho.length === 0} className={cn("btn-premium px-8 py-3 rounded-xl", briefing.nicho.length === 0 && "opacity-50 cursor-not-allowed")}>Próximo <ArrowRight className="w-4 h-4" /></button>
            </div>
          </motion.div>
        );
      case 2:
        return (
          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-8">
            <div className="text-center space-y-4">
              <div className="w-16 h-16 bg-white/5 border border-white/10 rounded-full flex items-center justify-center mx-auto mb-6">
                <Star className="w-8 h-8 text-[#d4af37]" />
              </div>
              <h2 className="font-serif text-3xl sm:text-4xl text-white/90">O Seu Diferencial</h2>
              <p className="text-white/50 font-light">Por que as clientes escolhem você e não a concorrência?</p>
            </div>
            <div className="space-y-6 max-w-2xl mx-auto">
              <textarea name="diferencial" value={briefing.diferencial} onChange={handleInputChange} placeholder="Ex: Uso apenas produtos importados, meu espaço tem uma experiência de spa relaxante, sou especialista em recuperar cabelos danificados..." className="input-premium min-h-[150px] text-lg p-6 resize-none" autoFocus />
              <div className="flex items-center justify-between mt-8">
                <button onClick={prevStep} className="text-white/50 hover:text-white flex items-center gap-2 px-4 py-2"><ChevronLeft className="w-4 h-4" /> Voltar</button>
                <button onClick={nextStep} disabled={!briefing.diferencial.trim()} className={cn("btn-premium px-8 py-3 rounded-xl", !briefing.diferencial.trim() && "opacity-50 cursor-not-allowed")}>Próximo <ArrowRight className="w-4 h-4" /></button>
              </div>
            </div>
          </motion.div>
        );
      case 3:
        return (
          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-8">
            <div className="text-center space-y-4">
              <div className="w-16 h-16 bg-white/5 border border-white/10 rounded-full flex items-center justify-center mx-auto mb-6">
                <Sparkles className="w-8 h-8 text-[#d4af37]" />
              </div>
              <h2 className="font-serif text-3xl sm:text-4xl text-white/90">O Cliente dos Sonhos</h2>
              <p className="text-white/50 font-light">Quem é a pessoa ideal que você quer atrair?</p>
            </div>
            <div className="space-y-6 max-w-2xl mx-auto">
              <textarea name="publico" value={briefing.publico} onChange={handleInputChange} placeholder="Ex: Mulheres executivas de 30 a 50 anos que têm pouco tempo mas não abrem mão de estarem impecáveis. Elas valorizam luxo e agilidade." className="input-premium min-h-[150px] text-lg p-6 resize-none" autoFocus />
              <div className="flex items-center justify-between mt-8">
                <button onClick={prevStep} className="text-white/50 hover:text-white flex items-center gap-2 px-4 py-2"><ChevronLeft className="w-4 h-4" /> Voltar</button>
                <button onClick={handleGenerate} disabled={!briefing.publico.trim() || isGenerating} className={cn("btn-premium px-8 py-3 rounded-xl", (!briefing.publico.trim() || isGenerating) && "opacity-50 cursor-not-allowed")}>
                  {isGenerating ? <Loader2 className="w-5 h-5 animate-spin" /> : <><Sparkles className="w-4 h-4" /> Gerar Calendário</>}
                </button>
              </div>
            </div>
          </motion.div>
        );
      case 4:
        return (
          <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="h-[60vh] flex flex-col items-center justify-center text-center space-y-8">
            <div className="relative">
              <div className="absolute inset-0 bg-[#d4af37]/20 blur-3xl rounded-full" />
              <Loader2 className="w-16 h-16 text-[#d4af37] animate-spin relative z-10" />
            </div>
            <div className="space-y-3">
              <h2 className="font-serif text-3xl text-white/90">Sintetizando sua Estratégia</h2>
              <p className="text-white/50 font-light max-w-md mx-auto">
                Nossa inteligência artificial está analisando seu briefing e escrevendo 30 dias de conteúdo altamente persuasivo para <strong>{briefing.nome}</strong>.
              </p>
            </div>
          </motion.div>
        );
      default:
        return null;
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="min-h-screen bg-[#0c0510] text-[#fafafa] flex flex-col"
    >
      {/* Premium Header */}
      <header className="border-b border-white/10 bg-[#0c0510]/80 backdrop-blur-md sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <div className="flex items-center gap-3 cursor-pointer" onClick={() => setViewMode('dashboard')}>
            <Logo size="sm" />
          </div>
          <div className="flex items-center gap-6">
            <button 
              onClick={() => setViewMode('dashboard')}
              className={cn("text-sm uppercase tracking-wider transition-colors flex items-center gap-2", viewMode === 'dashboard' ? "text-[#d4af37]" : "text-white/50 hover:text-white")}
            >
              <User className="w-4 h-4" />
              <span className="hidden sm:inline">Painel</span>
            </button>
            <button 
              onClick={onLogout}
              className="text-white/50 hover:text-white flex items-center gap-2 text-sm uppercase tracking-wider transition-colors"
            >
              <LogOut className="w-4 h-4" />
              <span className="hidden sm:inline">Sair</span>
            </button>
          </div>
        </div>
      </header>

      <main className="flex-1 max-w-7xl mx-auto px-6 py-12 w-full flex flex-col" ref={resultRef}>
        
        {viewMode === 'dashboard' ? (
          <DashboardScreen 
            userPlan={userPlan}
            onGenerateNew={() => {
              if (userPlan === 'paid') {
                // In a real app, we would show a custom modal here.
                // For this prototype, we just downgrade to free for the new plan.
                setUserPlan('free');
              }
              setGeneratedDays(null);
              setCurrentStep(0);
              setViewMode('generator');
            }}
            onViewHistory={() => setViewMode('history')}
            onSubscribe={() => {
              setUserPlan('subscriber');
              // In a real app, we would show a success toast here.
            }}
          />
        ) : viewMode === 'history' ? (
          <HistoryScreen 
            userId={userId} 
            onBack={() => setViewMode('dashboard')} 
            onSelectGeneration={(data) => {
              setGeneratedDays(data);
              setCurrentStep(5);
              setViewMode('generator');
            }} 
          />
        ) : (
          <>
            {error && (
          <div className="max-w-2xl mx-auto w-full glass-panel text-red-400 p-6 mb-8 border-red-500/20 rounded-2xl flex items-center justify-between">
            <p className="font-mono text-sm">{error}</p>
            <button onClick={() => setError(null)} className="text-white/50 hover:text-white"><X className="w-4 h-4" /></button>
          </div>
        )}

        {/* Quiz Section */}
        {currentStep < 5 && (
          <div className="flex-1 flex flex-col justify-center max-w-4xl mx-auto w-full">
            {/* Progress Bar */}
            {currentStep < 4 && (
              <div className="w-full max-w-md mx-auto mb-12 flex gap-2">
                {[0, 1, 2, 3].map((step) => (
                  <div key={step} className={cn("h-1 flex-1 rounded-full transition-colors duration-500", step <= currentStep ? "bg-[#d4af37]" : "bg-white/10")} />
                ))}
              </div>
            )}
            
            <AnimatePresence mode="wait">
              {renderQuizStep()}
            </AnimatePresence>
          </div>
        )}

        {/* Calendar Result Section */}
        {currentStep === 5 && generatedDays && (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="w-full">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-10 gap-6">
              <div>
                <h2 className="font-serif text-3xl sm:text-4xl text-white/90 mb-2">Calendário Estratégico</h2>
                <p className="text-white/50 font-light">30 dias de conteúdo personalizado para <strong className="text-white/80">{briefing.nome}</strong></p>
              </div>
              <button onClick={() => { setGeneratedDays(null); setCurrentStep(0); }} className="btn-premium-outline px-6 py-2 rounded-xl text-sm">
                Refazer Diagnóstico
              </button>
            </div>
            
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
              {generatedDays.map((day, index) => (
                <React.Fragment key={day.day}>
                  {index === 3 && userPlan === 'free' && (
                    <div className="col-span-full my-6">
                      <div className="bg-gradient-to-r from-[#d4af37]/10 via-purple-900/20 to-[#d4af37]/10 border border-[#d4af37]/30 rounded-3xl p-8 sm:p-12 text-center relative overflow-hidden">
                        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] opacity-20 mix-blend-overlay"></div>
                        <Lock className="w-12 h-12 text-[#d4af37] mx-auto mb-4 relative z-10" />
                        <h3 className="text-2xl sm:text-3xl font-serif mb-3 relative z-10 text-white/90">Desbloqueie seu mês completo</h3>
                        <p className="text-white/70 mb-8 max-w-2xl mx-auto relative z-10 text-lg">
                          Você já viu o poder da IA nos primeiros 3 dias. Desbloqueie os próximos 27 dias e tenha um calendário magnético completo para o seu negócio.
                        </p>
                        <button 
                          onClick={() => setShowPaywall(true)} 
                          className="relative z-10 px-8 py-4 bg-[#d4af37] text-black rounded-xl font-bold text-lg hover:bg-[#e6c258] transition-colors shadow-[0_0_20px_rgba(212,175,55,0.3)]"
                        >
                          Ver Opções de Desbloqueio
                        </button>
                      </div>
                    </div>
                  )}
                  <button
                    onClick={() => {
                      if (day.day > 3 && userPlan === 'free') {
                        setShowPaywall(true);
                      } else {
                        setSelectedDay(day);
                      }
                    }}
                    className="glass-panel p-4 sm:p-5 rounded-2xl hover:bg-white/10 transition-all text-left flex flex-col h-40 border border-white/5 hover:border-[#d4af37]/50 group relative overflow-hidden"
                  >
                    <div className="absolute top-0 left-0 w-1 h-full bg-[#d4af37] opacity-0 group-hover:opacity-100 transition-opacity" />
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-[#d4af37] font-serif text-lg">Dia {day.day}</span>
                      {day.day > 3 && userPlan === 'free' && <Lock className="w-4 h-4 text-white/30" />}
                    </div>
                    <span className="text-white/40 text-[10px] uppercase tracking-widest mb-3 flex items-center gap-1.5">
                      {day.postType.toLowerCase().includes('reel') || day.postType.toLowerCase().includes('vídeo') || day.postType.toLowerCase().includes('video') || day.postType.toLowerCase().includes('story') ? <Video className="w-3 h-3 text-white/60" /> : <ImageIcon className="w-3 h-3 text-white/60" />}
                      <span className="truncate">{day.postType}</span>
                    </span>
                    <h4 className={cn("text-white/80 font-medium text-xs sm:text-sm line-clamp-3 transition-colors leading-relaxed", day.day > 3 && userPlan === 'free' ? "blur-[2px] select-none" : "group-hover:text-white")}>
                      {day.day > 3 && userPlan === 'free' ? "Conteúdo exclusivo para assinantes premium. Desbloqueie para ver." : day.title}
                    </h4>
                  </button>
                </React.Fragment>
              ))}
            </div>
          </motion.div>
        )}
          </>
        )}

      </main>

      {/* Paywall Modal */}
      <AnimatePresence>
        {showPaywall && (
          <PaywallModal 
            onClose={() => setShowPaywall(false)} 
            onSuccess={(type) => {
              if (type === 'monthly') {
                setUserPlan('subscriber');
                setShowPaywall(false);
              } else {
                setShowPaywall(false);
                setShowUpsell(true);
              }
            }} 
          />
        )}
      </AnimatePresence>

      {/* Upsell Modal */}
      <AnimatePresence>
        {showUpsell && (
          <UpsellModal 
            onAccept={() => {
              setUserPlan('lifetime');
              setShowUpsell(false);
            }}
            onDecline={() => {
              setUserPlan('paid');
              setShowUpsell(false);
            }}
          />
        )}
      </AnimatePresence>

      {/* Day Detail Modal */}
      <AnimatePresence>
        {selectedDay && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 bg-black/80 backdrop-blur-md"
            onClick={() => setSelectedDay(null)}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 20 }}
              onClick={(e) => e.stopPropagation()}
              className="glass-panel w-full max-w-3xl max-h-[90vh] overflow-y-auto rounded-3xl border border-white/10 shadow-2xl relative custom-scrollbar bg-[#0a0a0a]"
            >
              <div className="sticky top-0 bg-[#0a0a0a]/90 backdrop-blur-xl border-b border-white/10 p-6 sm:p-8 flex items-start justify-between z-10">
                <div>
                  <span className="text-[#d4af37] font-serif text-xl mb-2 block">Dia {selectedDay.day}</span>
                  <h2 className="text-2xl sm:text-3xl font-serif text-white/90">{selectedDay.title}</h2>
                  <div className="flex items-center gap-3 mt-3">
                    <span className="px-3 py-1 rounded-full bg-white/5 border border-white/10 text-white/60 text-xs uppercase tracking-widest flex items-center gap-2">
                      {selectedDay.postType.toLowerCase().includes('reel') || selectedDay.postType.toLowerCase().includes('vídeo') || selectedDay.postType.toLowerCase().includes('video') ? <Video className="w-3 h-3" /> : <ImageIcon className="w-3 h-3" />}
                      {selectedDay.postType}
                    </span>
                  </div>
                </div>
                <button 
                  onClick={() => setSelectedDay(null)}
                  className="p-2 rounded-full hover:bg-white/10 text-white/50 hover:text-white transition-colors"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              <div className="p-6 sm:p-8 space-y-8">
                {/* Visual Concept */}
                <div className="space-y-3">
                  <h4 className="text-xs uppercase tracking-widest text-white/40 font-semibold flex items-center gap-2">
                    <Smartphone className="w-4 h-4" /> Visual / Cena
                  </h4>
                  <div className="p-4 rounded-2xl bg-white/5 border border-white/5 text-white/80 font-light leading-relaxed">
                    {selectedDay.visualConcept}
                  </div>
                </div>

                {/* Video Script */}
                {selectedDay.videoScript && selectedDay.videoScript.trim() !== '' && (
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <h4 className="text-xs uppercase tracking-widest text-white/40 font-semibold flex items-center gap-2">
                        <Video className="w-4 h-4" /> Roteiro do Vídeo (Fale isso)
                      </h4>
                      <CopyButton text={selectedDay.videoScript} label="Copiar Roteiro" />
                    </div>
                    <div className="p-5 rounded-2xl bg-[#d4af37]/10 border border-[#d4af37]/20 text-[#d4af37] font-medium leading-relaxed text-lg">
                      "{selectedDay.videoScript}"
                    </div>
                  </div>
                )}

                {/* Caption */}
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <h4 className="text-xs uppercase tracking-widest text-white/40 font-semibold flex items-center gap-2">
                      <FileText className="w-4 h-4" /> Legenda do Post
                    </h4>
                    <CopyButton text={`${selectedDay.caption}\n\n${selectedDay.hashtags}`} label="Copiar Legenda" />
                  </div>
                  <div className="p-5 rounded-2xl bg-white/5 border border-white/5 text-white/80 font-light leading-relaxed whitespace-pre-wrap">
                    {selectedDay.caption}
                    <br /><br />
                    <span className="text-[#d4af37]">{selectedDay.hashtags}</span>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

// --- Main App ---

export default function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userId, setUserId] = useState<string | null>(null);

  const handleLogin = () => {
    // Simulating login and getting a user ID
    setUserId('user-123');
    setIsAuthenticated(true);
  };

  const handleLogout = () => {
    setUserId(null);
    setIsAuthenticated(false);
  };

  return (
    <AnimatePresence mode="wait">
      {!isAuthenticated || !userId ? (
        <AuthScreen key="auth" onLogin={handleLogin} />
      ) : (
        <PlannerScreen key="planner" userId={userId} onLogout={handleLogout} />
      )}
    </AnimatePresence>
  );
}

