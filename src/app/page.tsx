import Image from "next/image";
import WhyChooseProStock from "./components/WyChooseProStock";
import DownloadAPK from "./components/DownloadAPK";
export default function Home() {
  const customerReviews = [
    {
      name: "Rohit Sharma",
      review:
        "ProStock’s intuitive interface and real-time updates make trading simple and efficient. Perfect for both beginners and experts!",
      image: "/images/user-1.jpg",
    },
    {
      name: "Sneha Patel",
      review:
        "Affordable, transparent, and packed with advanced tools. ProStock is the best platform for hassle-free trading in India!",
      image: "/images/user-1.jpg",
    },
    {
      name: "Amit Verma",
      review:
        "Great educational resources and excellent customer support. ProStock makes stock trading accessible and enjoyable for everyone!",
      image: "/images/user-1.jpg",
    },
  ];

  return (
    <>
      <section className="hero-section h-fit w-full pt-10 px-20 max-sm:px-4 max-sm:pt-32 flex max-sm:flex-col justify-center items-center gap-28 max-sm:gap-10">
        <div
          data-aos="fade-up"
          data-aos-delay="10"
          data-aos-duration="300"
          className=" flex flex-col gap-6 max-sm:gap-2 max-sm:items-center"
        >
          <h2 className="text-6xl max-sm:text-[2.6rem] font-bold font-Roboto  text-text_color">
            Empowering every trade
          </h2>
          <h2 className="text-6xl max-sm:text-[2.6rem] font-bold font-Roboto  text-text_color">
            for a rising India.
          </h2>
          <h2 className="text-5xl max-sm:text-[2.2rem] font-semibold font-Roboto  text-text_lite_color">
            {" "}
            Built for smart investors
          </h2>

          <DownloadAPK />
        </div>

        <Image
          data-aos="zoom-in-up"
          data-aos-duration="600"
          className="mt-6 h-[38rem] max-sm:h-[34rem] w-fit"
          src={"/mokups/hero-mokup-lite.png"}
          alt=""
          width={1000}
          height={1000}
        />
      </section>
      <div id="about" />
      <section className="mt-20 h-fit flex flex-col gap-6 w-full px-44 max-sm:px-8">
        <h2
          data-aos="fade-up"
          data-aos-delay="10"
          data-aos-duration="300"
          className="text-5xl font-bold font-Roboto  text-text_color"
        >
          What is ProStock?{" "}
        </h2>

        <p
          data-aos="fade-up"
          data-aos-delay="10"
          data-aos-duration="300"
          className="text-xl font-medium font-Roboto  text-text_lite_color"
        >
          ProStock is a powerful and intuitive trading app designed to empower
          investors with seamless access to the stock market. Whether
          you&apos;re a beginner or a seasoned trader, ProStock provides you
          with a platform to buy and sell stocks at your convenience based on
          your preferences and strategies. With ProStock, users gain full
          control over their investments, enabling them to make informed
          decisions in real-time. The platform offers a user-friendly interface,
          ensuring that navigating the stock market is simple, efficient, and
          hassle-free.
        </p>
        <div className="flex max-sm:flex-col w-full justify-between items-center">
          <div
            data-aos="fade-up"
            data-aos-delay="10"
            data-aos-duration="500"
            className="w-[50%] max-sm:w-full flex flex-col gap-4"
          >
            <h2 className="text-4xl font-bold font-Roboto  text-text_color">
              What we offers
            </h2>
            <div className="flex flex-col gap-4">
              <h2 className="text-[1.3rem] font-medium font-Roboto text-text_lite_color">
                <span className="text-text_color font-semibold">
                  Buy and Sell with Ease:
                </span>{" "}
                Execute trades effortlessly, whether you&apos;re investing for
                the long term or trading for quick gains.
              </h2>
              <h2 className="text-[1.3rem] font-medium font-Roboto text-text_lite_color">
                <span className="text-text_color font-semibold">
                  Full Access:
                </span>{" "}
                Enjoy unrestricted access to market data and tools to make
                buying and selling stocks as smooth as possible.
              </h2>

              <h2 className="text-[1.3rem] font-medium font-Roboto text-text_lite_color">
                <span className="text-text_color font-semibold">
                  Real-Time Updates:{" "}
                </span>{" "}
                Stay ahead of market trends with live stock prices and analysis
                tools.
              </h2>

              <h2 className="text-[1.3rem] font-medium font-Roboto text-text_lite_color">
                <span className="text-text_color font-semibold">
                  Built for You:
                </span>{" "}
                Designed to meet the needs of every type of investor, from
                beginners exploring the stock market to experts looking for
                advanced features.
              </h2>

              <h2 className="text-[1.3rem] font-medium font-Roboto text-text_lite_color">
                ProStock is not just a trading app—it’s your partner in
                achieving financial goals. With a mission to simplify investing
                and empower individuals, ProStock is redefining the way India
                trades. Start your journey with ProStock today and take charge
                of your investments like never before!
              </h2>
            </div>
          </div>

          <Image
            data-aos="zoom-in-down"
            data-aos-delay="200"
            data-aos-duration="600"
            className="mt-6 h-[40rem] w-fit"
            src={"/mokups/lite-2-left.png"}
            alt=""
            width={1000}
            height={1000}
          />
        </div>
      </section>
      <div id="why-prostock" />
      <section className="mt-20 h-screen max-sm:h-fit flex flex-col gap-6 w-full px-44 max-sm:px-8">
        <h2
          data-aos="fade-up"
          data-aos-delay="10"
          data-aos-duration="500"
          className="text-5xl font-bold font-Roboto  text-text_color"
        >
          Why Choose ProStock?{" "}
        </h2>

        <p
          data-aos="fade-up"
          data-aos-delay="10"
          data-aos-duration="500"
          className="text-xl font-medium font-Roboto  text-text_lite_color"
        >
          ProStock stands out as a comprehensive and innovative trading platform
          designed to simplify your journey in the stock market. Whether you are
          a beginner exploring investments or an experienced trader seeking
          advanced tools, ProStock offers everything you need to trade
          confidently and achieve your financial goals. Here’s why ProStock is
          the right choice for you:
        </p>

        <WhyChooseProStock />
      </section>
      <div id="Testimonials" />
      <section className="h-fit mt-14 mb-24 flex max-sm:flex-col max-sm:px-8 items-center justify-between gap-6 w-full px-44">
        <div
          data-aos="fade-up"
          data-aos-delay="10"
          data-aos-duration="500"
          className="flex flex-col w-full gap-4 "
        >
          <h2 className="text-5xl font-bold font-Roboto  text-text_color">
            What Our <br />
            Customers Says
          </h2>
          <p className="text-lg w-[30rem] max-sm:w-full text-text_lite_color font-semibold">
            Regation so in confined sma!test children unpacked delicate. Why sir
            end betime uncivil respect Always get adieus nature day course for
            common
          </p>
          <button className="mt-2 h-12 w-44 font-bold  text-white bg-theme_color rounded-md">
            View more
          </button>
        </div>

        <div className="flex flex-col gap-6 w-[50%] max-sm:w-full">
          {customerReviews?.map((item, index) => {
            return (
              <div
                data-aos="zoom-in"
                data-aos-delay="10"
                data-aos-duration="500"
                key={index}
                className={`${
                  index === 1 ? " border-l-theme_color" : "ml-20 max-sm:ml-0"
                } px-4 py-4 flex gap-6 w-[30rem] max-sm:w-full items-center rounded-lg border-slate-400 border-[1px] border-l-8`}
              >
                <Image
                  className="h-[4.6rem] rounded-full w-[4.6rem]"
                  src={item.image}
                  alt=""
                  width={1000}
                  height={1000}
                />
                <div>
                  <h2 className="text-xl font-bold text-text_color">
                    {item?.name}
                  </h2>
                  <p className="text-base font-semibold  text-text_lite_color leading-5 ">
                    {item?.review}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </section>
    </>
  );
}
