import { FC } from 'react';

interface MentalEnergyProps {
  
}

export const MentalEnergy: FC<MentalEnergyProps> = () => {
  return (
    <div className="w-full h-full flex items-center p-4">
      <div className="w-48 bg-primary">
      </div> 
      <div className="w-full bg-primary"></div>
    </div>
  )
}
