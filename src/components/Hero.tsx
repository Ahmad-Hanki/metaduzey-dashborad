import Link from "next/link";

const Hero = () => {
  return (
    <div className="">
      <div
        className="hero min-h-screen"
        style={{
          backgroundImage:
            "url(https://usabilitygeek.com/wp-content/uploads/2020/06/color-1024x683.jpg)",
        }}
      >
        <div className="hero-overlay bg-opacity-60"></div>
        <div className="hero-content text-center text-neutral-content">
          <div className="max-w-md">
            <h1 className="mb-5 text-5xl font-bold text-black">Merhabalar!</h1>
            <p className="mb-5 text-black">
              Terapi web sitenizi kolayca yönetmek için sezgisel panelimizi
              kullanın. Terapi seanslarını sorunsuz bir şekilde yönetin, ilgi
              çekici blogları yayınlayın, randevuları takip edin ve iletişim
              taleplerini görüntüleyin - tüm bunlar, verimli yönetim için
              tasarlanmış tek bir pratik alan içinde.
            </p>
            <Link href={"/ekib"} className="btn ">
              Başlayın
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
