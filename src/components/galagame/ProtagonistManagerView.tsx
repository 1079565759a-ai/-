import React, { useState } from 'react';
import { motion } from 'motion/react';
import { ArrowLeft, Save, User, Plus, Trash2 } from 'lucide-react';
import { cn } from '../../utils/cn';

interface ProtagonistManagerProps {
  onClose: () => void;
  appState: any;
  updateState: (key: string, value: any) => void;
}

export const ProtagonistManagerView: React.FC<ProtagonistManagerProps> = ({ onClose, appState, updateState }) => {
  const [protagonists, setProtagonists] = useState<any[]>(appState.galaProtagonists || []);

  const handleSave = () => {
    updateState('galaProtagonists', protagonists);
    onClose();
  };

  const addProtagonist = () => {
    const newP = {
      id: Date.now().toString(),
      name: '新主人公面具',
      nameType: 'custom',
      fixedName: '',
      persona: ''
    };
    setProtagonists([...protagonists, newP]);
  };

  const updateProtagonist = (index: number, key: string, value: any) => {
    const newP = [...protagonists];
    newP[index] = { ...newP[index], [key]: value };
    setProtagonists(newP);
  };

  const removeProtagonist = (index: number) => {
    const newP = [...protagonists];
    newP.splice(index, 1);
    setProtagonists(newP);
  };

  return (
    <motion.div initial={{ x: '100%' }} animate={{ x: 0 }} exit={{ x: '100%' }} className="fixed inset-0 z-[110] bg-[#fdfbfb] flex flex-col font-sans">
      <div className="px-6 py-6 flex items-center justify-between border-b border-gray-100 bg-white/80 backdrop-blur-md z-10 sticky top-0">
        <div className="flex items-center gap-4">
          <button onClick={onClose} className="p-1 -ml-1 text-gray-400 hover:text-gray-900 transition-colors">
            <ArrowLeft strokeWidth={1.5} size={20} />
          </button>
          <h2 className="text-[12px] font-serif font-bold uppercase tracking-widest text-[#d49a9f]">
            Protagonist Masks / 主人公面具
          </h2>
        </div>
        <button onClick={addProtagonist} className="p-2 bg-[#fcefee] text-[#d49a9f] rounded-full hover:bg-[#ebd5d5] transition-colors"><Plus className="w-4 h-4"/></button>
      </div>

      <div className="flex-1 overflow-y-auto px-6 py-8 space-y-8 pb-32">
        {protagonists.length === 0 ? (
           <div className="text-center mt-20 opacity-50 space-y-4">
              <User className="w-12 h-12 mx-auto text-[#d49a9f] opacity-50" />
              <p className="text-sm tracking-widest text-gray-500 font-bold">暂无面具，点击右上角新增</p>
           </div>
        ) : (
           protagonists.map((pro, index) => (
             <div key={pro.id} className="p-6 bg-white border border-[#fcefee] rounded-3xl shadow-[0_4px_20px_rgba(212,154,159,0.06)] relative space-y-6">
                <button onClick={() => removeProtagonist(index)} className="absolute top-6 right-6 text-gray-300 hover:text-red-400">
                  <Trash2 className="w-5 h-5"/>
                </button>
                
                <div>
                  <label className="text-[10px] text-[#d49a9f] font-bold uppercase tracking-widest block mb-2">面具标识名</label>
                  <input type="text" value={pro.name} onChange={e => updateProtagonist(index, 'name', e.target.value)} className="w-3/4 border-b border-gray-200 bg-transparent py-2 text-base font-bold text-gray-900 outline-none focus:border-[#d49a9f]" placeholder="面具名称" />
                </div>

                <div className="space-y-4">
                  <label className="text-[10px] text-gray-500 font-bold uppercase tracking-widest block flex items-center gap-2">
                    Name Setting / 游戏内姓名设置
                  </label>
                  <div className="flex flex-col gap-3">
                    {[
                      { id: 'fixed', label: '固定姓名' },
                      { id: 'none', label: '无姓名 (隐藏代称)' },
                      { id: 'custom', label: '自定义姓名 (开局由玩家填)' }
                    ].map(t => (
                      <label key={t.id} className="flex items-center justify-between cursor-pointer p-4 border border-gray-100 rounded-xl hover:border-[#d49a9f]/30 transition-all bg-gray-50/50">
                        <span className="text-[13px] font-bold text-gray-700">{t.label}</span>
                        <input 
                          type="radio" 
                          name={`nameType_${pro.id}`} 
                          value={t.id} 
                          checked={pro.nameType === t.id} 
                          onChange={e => updateProtagonist(index, 'nameType', e.target.value)}
                          className="w-4 h-4 text-[#d49a9f] accent-[#d49a9f]"
                        />
                      </label>
                    ))}
                  </div>
                  {pro.nameType === 'fixed' && (
                    <div className="pt-2 animate-in fade-in slide-in-from-top-2">
                      <label className="text-[10px] text-gray-500 font-bold uppercase tracking-widest block mb-2">Fixed Name / 输入固定姓名</label>
                      <input 
                        type="text" 
                        value={pro.fixedName} 
                        onChange={e => updateProtagonist(index, 'fixedName', e.target.value)} 
                        className="w-full border-b border-gray-200 bg-transparent py-2 text-sm font-bold outline-none focus:border-[#d49a9f]" 
                        placeholder="例如：林星" 
                      />
                    </div>
                  )}
                </div>

                <div className="space-y-4">
                  <label className="text-[10px] text-gray-500 font-bold uppercase tracking-widest block mb-2">Persona / 人设卡 (供AI参考)</label>
                  <textarea 
                    value={pro.persona} 
                    onChange={e => updateProtagonist(index, 'persona', e.target.value)} 
                    className="w-full p-4 bg-gray-50 border border-gray-100 rounded-xl text-sm h-32 resize-none outline-none focus:border-[#d49a9f] leading-relaxed transition-colors" 
                    placeholder="描述主人公的性格、身世、背景、习惯..." 
                  />
                </div>
             </div>
           ))
        )}
      </div>

      <div className="fixed bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-white via-white to-transparent pointer-events-none">
         <button onClick={handleSave} className="w-full py-4 bg-[#d49a9f] text-white font-bold tracking-widest rounded-2xl text-sm hover:bg-[#c59196] shadow-xl pointer-events-auto transition-colors">
            保存面具设定
         </button>
      </div>
    </motion.div>
  );
};
