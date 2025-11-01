export default function CardStat({
  title,
  value,
  note,
  badge,
  icon,
  iconBg,
  progress = 85, // number 0-100
}) {
  return (
    <div className="bg-white rounded-2xl shadow-sm p-4 sm:p-5 w-full sm:max-w-[220px]">
      <div className="flex justify-between items-start mb-4">
        {icon && (
          <div
            className={`w-10 h-10 sm:w-12 sm:h-12 ${iconBg || 'bg-pink-100'} rounded-xl flex items-center justify-center`}
          >
            {icon}
          </div>
        )}
        {badge && (
          <span className="text-xs sm:text-xs bg-green-100 text-green-600 px-3 py-1 rounded-full font-medium">
            {badge}
          </span>
        )}
      </div>

      <h3 className="text-xs sm:text-sm text-gray-500 mb-3">{title}</h3>

      <p className="text-2xl sm:text-4xl font-bold text-gray-800 mb-4">{value}</p>

      <div className="w-full bg-gray-200 rounded-full h-1.5 sm:h-2 mb-2 overflow-hidden">
        <div
          className="bg-gradient-to-r from-pink-400 to-pink-300 h-1.5 sm:h-2 rounded-full"
          style={{ width: `${progress}%` }}
        />
      </div>

      <p className="text-xs text-gray-400">{note}</p>
    </div>
  );
}