// Returns a random DNA base
const returnRandBase = () => {
  const dnaBases = ['A', 'T', 'C', 'G'];
  return dnaBases[Math.floor(Math.random() * 4)];
};

// Returns a random single stand of DNA containing 15 bases
const mockUpStrand = () => {
  const newStrand = [];
  for (let i = 0; i < 15; i++) {
    newStrand.push(returnRandBase());
  }
  return newStrand;
};

//Create the Factory Function pAequorFactory()
const pAequorFactory = (specimenNum, dna) => {
  return {
    specimenNum,
    dna,

    mutate(){
      const randomIndex = Math.floor(Math.random() * this.dna.length); //get a random number based on the lenght of the array
      let newBase = returnRandBase(); //get a random base before comparing

      while(this.dna[randomIndex] === newBase){ //compares both bases and assigns a new one until they are different
        newBase = returnRandBase();
      }

      this.dna[randomIndex] = newBase; //assign the new 'different' base
      return this.dna
    },

    compareDNA(compareOrg){
      const similarities = this.dna.reduce((acc, current, index, array) =>{
        if(array[index] === compareOrg.dna[index]) {
          return acc + 1;
        } else {
          return acc;
        };
      }, 0);

      const percentage = (similarities / this.dna.length) * 100;
      const percentageTo2Decimals = percentage.toFixed(2);
      return `specimen ${this.specimenNum} and specimen ${compareOrg.specimenNum} have ${percentageTo2Decimals}% DNA in common.`;
    },

    willLikelySurvive(){
      const survivalBases = this.dna.filter(el => el === "C" || el === "G");
      return survivalBases.length / this.dna.length >= 0.6;
    },
  }
};


const storedSpecimens = [];
for (i = 0; i < 30; i++) {
  storedSpecimens.push(pAequorFactory(i, mockUpStrand()));
};

// Run.
const pAequor = pAequorFactory(999, mockUpStrand());
console.log(`pAequor BEFORE mutation\nSpecimen: ${pAequor.specimenNum}\nDNA Strand: ${pAequor.dna}\n`);

pAequor.mutate();
console.log(`pAequor AFTER mutation\nSpecimen: ${pAequor.specimenNum}\nDNA Strand: ${pAequor.dna}`);

const pAequor1 = pAequorFactory(999, mockUpStrand());
const pAequor2 = pAequorFactory(1000, mockUpStrand());

let compare = pAequor1.compareDNA(pAequor2);
console.log('Comparison: ' + compare);
let survive = pAequor1.willLikelySurvive();
console.log('Will pAequor1 survive? ' + survive);
survive = pAequor2.willLikelySurvive();
console.log('Will pAequor2 survive? ' + survive);