import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Bemutatkozás | Dr. Kovács Péter ügyvéd Veszprém',
  description: 'Dr. Kovács Péter ügyvéd bemutatkozása. 25 év tapasztalat családjogi, ingatlanjogi és öröklési ügyekben Veszprémben.',
}

export default function Rolam() {
  return (
    <div className="section section-white">
      <div className="container">
        <div className="about-page">
          <h1 className="about-title">Dr. Kovács Péter</h1>
          <p className="about-subtitle">Ügyvéd, mediátor</p>
          
          <div className="about-content">
            <div className="about-image">
              <Image 
                src="/images/dr-kovacs-peter.jpg" 
                alt="Dr. Kovács Péter" 
                width={200} 
                height={200} 
              />
            </div>
            
            <div className="about-text">
              <h2>Szakmai tapasztalat</h2>
              <p>
                1998-ban végeztem az ELTE Állam- és Jogtudományi Karán. 
                Azóta folyamatosan jogi szakvizsgával rendelkező ügyvédként tevékenykedem 
                Veszprémben.
              </p>
              <p>
                Szakterületeim közé tartozik a családjog, ingatlanjog, öröklési jog, 
                valamint a mediáció. Tagja vagyok a Magyar Ügyvédi Kamarának és a 
                Veszprémi Ügyvédi Kamarának.
              </p>
              
              <h2>Szakterületek</h2>
              <ul>
                <li>Családjog (válóper, gyermektartás, gyermekelhelyezés, szülői felügyelet)</li>
                <li>Ingatlanjog (adásvétel, ajándékozás, haszonélvezet)</li>
                <li>Öröklési jog (végrendelet, hagyatéki eljárás)</li>
                <li>Mediáció (alternatív vitarendezés)</li>
                <li>Cégeljárások (cégalapítás, cégátírás)</li>
              </ul>
              
              <h2>Filozófiám</h2>
              <p>
                Hiszek abban, hogy a jogi segítségnek közérthetőnek, átláthatónak és 
                empatikusnak kell lennie. Célom, hogy ügyfeleim megértsék a jogi 
                folyamatokat, és tájékozottan hozhassák meg döntéseiket.
              </p>
            </div>
          </div>
          
          <div className="about-cta">
            <Link href="/kapcsolat" className="btn btn-primary">
              Kapcsolatfelvétel
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}