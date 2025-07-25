import logoImage from '@assets/Gemini_Generated_Image_qzl4w9qzl4w9qzl4_1753459645622.png';

interface LogoProps {
  size?: 'sm' | 'md' | 'lg';
  showText?: boolean;
}

export default function Logo({ size = 'md', showText = true }: LogoProps) {
  const sizeClasses = {
    sm: 'w-8 h-8',
    md: 'w-12 h-12',
    lg: 'w-16 h-16'
  };

  const textSizeClasses = {
    sm: 'text-lg',
    md: 'text-xl',
    lg: 'text-2xl'
  };

  return (
    <div className="flex items-center space-x-3">
      <img 
        src={logoImage}
        alt="Shinde'z Organics Logo"
        className={`${sizeClasses[size]} rounded-full object-cover`}
      />
      {showText && (
        <div>
          <h1 className={`text-forest-green font-heading font-bold ${textSizeClasses[size]}`}>
            Shinde'z Organics
          </h1>
          {size !== 'sm' && (
            <p className="text-sage-green text-sm">For a Greener Tomorrow</p>
          )}
        </div>
      )}
    </div>
  );
}
