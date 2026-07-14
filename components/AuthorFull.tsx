// components/AuthorFull.tsx - RÖVIDÍTVE
import Image from 'next/image'
import Link from 'next/link'

export default function AuthorFull() {
  return (
    <div className="author-full">
      <div className="author-full-header">
        <div className="author-full-image">
          <Image
            src="/images/dr-léner-pintér-sára-ügyvédasszony.png"
            alt="dr. Léner-Pintér Sára ügyvédasszony"
            width={180}
            height={180}
            className="author-image"
          />
        </div>
        <div>
          <h2 className="author-full-name">dr. Léner-Pintér Sára</h2>
          <p className="author-full-subtitle">Ügyvéd, mediátor</p>
        </div>
      </div>

      <div className="author-full-body">
        <div className="author-highlights">
          <span>⚖️ 25 év tapasztalat</span>
          <span>🎓 ELTE ÁJK</span>
          <span>📍 Veszprém</span>
        </div>

        <p className="author-description">
          Célom, hogy ügyfeleim számára <strong>átlátható, őszinte és hatékony</strong> jogi segítséget nyújtsak. 
          Hiszek abban, hogy a jogi problémákra <strong>emberközpontú megoldásokat</strong> kell találni, 
          különösen a családjogi ügyekben.
        </p>

        <p className="author-description">
          Munkám során a <strong>prevencióra</strong> és a <strong>békés vitarendezésre</strong> törekszem, 
          de ha szükséges, határozottan képviselem ügyfeleim érdekeit a bíróságokon is.
        </p>

        <div className="author-full-cta">
          <Link href="/kapcsolat" className="btn btn-accent">
            Lépjen velem kapcsolatba
          </Link>
        </div>
      </div>
    </div>
  )
}