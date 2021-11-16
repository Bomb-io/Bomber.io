import React, {useState, useEffect,} from 'react';

function Bomb() {
  const [exploding, startExplosion] = useState(false);

  useEffect(function(){
    setTimeout(() => startExplosion(true), 2000)
  })

  return <span class="bomb">{(() => {
    if(exploding == true){
      return "------O------"
    }else{
      return "O"
    }
  })()}</span>;
}

export default Bomb;