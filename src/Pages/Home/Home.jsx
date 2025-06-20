import React from 'react';
import Main from '../../Components/Main/Main';
import Features from '../../Components/Feautures/Feautures';
import WhatYouCanDo from '../../Components/WhatYouCanDo/WhatYouCanDo';
import WhyChooseUs from '../../Components/WhyChooseUs/WhyChooseUs';
import Statistics from '../../Components/Statistics/Statistics';
import PingTool from '../../Components/PingTool/PingTool';
import BannerTools from '../../Components/BannerTools/BannerTools';
import CallToAction from '../../Components/CallToAction/CallToAction';

export default function Home() {
  return (
    <section className="home">
      <Main />
      <Features />
      <WhatYouCanDo />
      <WhyChooseUs />
      <Statistics />
      <PingTool />
      <BannerTools />
      <CallToAction />
    </section>
  );
}
