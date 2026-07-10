// components/AuthorFull.tsx
import Image from 'next/image'
import Link from 'next/link'

export default function AuthorFull() {
  return (
    <div className="author-full">
      <div className="author-full-header">
        <div className="author-full-image">
          <Image
            src="/images/ugyved-foto.jpg"
            alt="dr. Léner-Pintér Sára ügyvédasszony"
            width={180}
            height={180}
            className="author-image"
          />
        </div>
        <div>
          <h2 className="author-full-name">dr. Léner-Pintér Sára ügyvédasszony</h2>
          <p className="author-full-subtitle">Ügyvéd, mediátor</p>
        </div>
      </div>

      <div className="author-full-body">
        <p>
          Az ELTE Állam- és Jogtudományi Kar elvégzése után a biztosítási, majd közbeszerzési jog, 
          civil szervezetekkel és vállalkozásokkal kapcsolatos jogterületeken szereztem további 
          ismereteket és tapasztalatot. Később érdeklődésem fókusza a család körüli ügyekre irányult. 
          Ezek után, vezető beosztásban a munkajog, később pedig közszolgálati tisztviselőként a 
          közigazgatási és önkormányzati jog rejtelmeiben szereztem tudást és tapasztalatot.
        </p>

        <p>
          A munkáim során a szakmailag korrekt, hatékony és gyors ügyintézés mellett az utóbbi 
          időben az általam legdemokratikusabb esetmegoldási lehetőségre: <strong>a felek egyezségen 
          alapuló vitarendezésére</strong> törekeszem.
        </p>

        <h3>Miért lettem jogász?</h3>
        <ul>
          <li>
            <strong>Mert már gyermekkoromban is mások prókátora voltam.</strong> 
            Latin szó: procurator (képviselő, gondviselő), curo (gondoskodás, gond)
          </li>
          <li>
            <strong>Mert nem akartam fogadatlan prókátor maradni</strong>, ezért a szaktudás 
            megszerzésére és tapasztalatszerzésre szántam az időmet.
          </li>
          <li>
            <strong>Titus Livius szavaival:</strong> "A törvény olyan korlát, amely akár életet is ment." 
            Mert fontosnak tartom, hogy a folyton változó világunkhoz igazodó jogszabályok 
            labirintusában segítsek eligazodni azoknak, akik elakadtak, eltévedtek, vagy csak elfáradtak.
          </li>
          <li>
            <strong>Mert fontos volt, hogy elérhetővé tegyem a jog világát mások számára.</strong> 
            Az érthetőségre törekvésemben egy ügyvéd tanárom mondása meghatározó volt számomra: 
            <em>"a jogászhoz a jog nyelvén, az ügyfélhez az ügyfél nyelvén szólj!"</em>
          </li>
        </ul>

        <blockquote className="author-quote">
          <p>"Ember küzdj és bízva bízzál!"</p>
          <footer>— Madách Imre: Az ember tragédiája 15. szín</footer>
        </blockquote>

        <div className="author-full-cta">
          <Link href="/kapcsolat" className="btn btn-accent">
            Lépjen velem kapcsolatba
          </Link>
        </div>
      </div>
    </div>
  )
}