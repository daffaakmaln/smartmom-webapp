export default function CardStat({ title, value, note, badge, icon ,iconBg}) {
  return (
    <div className="bg-white rounded-2xl shadow-sm p-5 max-w-[220px] w-full">
      <div className="flex justify-between items-start mb-4">
        {icon && (
          <div className={`w-12 h-12 ${iconBg || 'bg-pink-100'} rounded-xl flex items-center justify-center`}>
            {icon}
          </div>
        )}
        {badge && (
          <span className="text-xs bg-green-100 text-green-600 px-3 py-1 rounded-full font-medium">
            {badge}
          </span>
        )}
      </div>
      
      <h3 className="text-sm text-gray-500 mb-3">{title}</h3>
      
      <p className="text-4xl font-bold text-gray-800 mb-4">{value}</p>
      
      <div className="w-full bg-gray-200 rounded-full h-2 mb-2">
        <div className="bg-gradient-to-r from-pink-400 to-pink-300 h-2 rounded-full" style={{width: '85%'}}></div>
      </div>
      
      <p className="text-xs text-gray-400">{note}</p>
    </div>
  );
}