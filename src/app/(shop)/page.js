import Image from 'next/image';
import Link from 'next/link';

import { Suspense } from 'react';
import { CgSpinner } from 'react-icons/cg';
import styles from './homepage.module.css';

import homeHeroImageMobile from '../../../public/images/homeHeroImageMobile.png';
import historySectionImageDesktop from '../../../public/images/historySectionImageDesktop.png';
import historySectionImageMobile from '../../../public/images/historySectionImageMobile.png';
import InputEmail from '../components/Inputs/InputEmail';
import CarouselFeedback from '../components/CarouselFeedback/CarouselFeedback';
import ProdutosCarouselSection from '../components/ProdutosCarouselSection/ProdutosCarouselSection';

function Homepage() {
  return (
    <div className={`${styles.homePage}`}>
      <div className={styles.homeHeroContainer}>
        <Image
          priority={true}
          src="/images/homeHeroImageDesktop.png"
          alt="imagem garota propaganda"
          style={{ display: 'none' }}
          width={2654}
          height={1604}
        />
        <h1 className={styles.heroTitle}>
          Abrace o <span>Luxo</span> em Cada Detalhe!
        </h1>
        <div className={styles.marker} />
        <p>
          Não espere mais! Explore agora mesmo nossa emocionante coleção de
          lançamentos e descubra o que há de mais recente em semijoias.
        </p>
      </div>
      <div className={styles.homePageWrapper}>
        <Image
          className={styles.heroImage}
          priority={true}
          src={homeHeroImageMobile}
          alt="imagem garota propaganda"
        />
        <div className={styles.section}>
          <div className={styles.sectionTitleContainer}>
            <h2>Confira Os Nossos Lançamentos</h2>
            <div className={styles.marker} />
          </div>
          <p className={styles.lancamentosDesc}>
            Descubra nossas novidades mais reluzentes! Na Acme, estamos
            empolgados em apresentar as mais recentes adições à nossa coleção de
            joias.
          </p>
          <Suspense fallback={<CgSpinner className="spinner" size={34} />}>
            <ProdutosCarouselSection categoriaSlug="lancamentos" />
          </Suspense>
          <Link
            href="/lancamentos"
            className={`btnEnter btnPrimary ${styles.sectionLink}`}
          >
            Ver Lançamentos
          </Link>
        </div>
        <div className={`${styles.section} ${styles.blue}`}>
          <div className={styles.sectionTitleContainer}>
            <h2>
              Descubra Nossa História De Mais De 20 Anos No Mundo Das Joias
            </h2>
            <div className={styles.marker} />
          </div>
          <p>
            Na Acme, nossa missão é encantar nossos clientes com joias
            atemporais de qualidade excepcional. Com mais de 20 anos de
            experiência, celebramos a importância das joias como guardiãs de
            momentos especiais e símbolos de amor e amizade. Nossos valores de
            qualidade, autenticidade e atendimento ao cliente exemplificam nossa
            dedicação em proporcionar uma experiência única. Convidamos você a
            fazer parte da nossa jornada de 20 anos, onde cada joia tem uma
            história e cada cliente é uma parte valiosa da nossa trajetória.
          </p>
          <Link
            href="#"
            className={`btnEnter btnPrimary ${styles.sectionLink}`}
          >
            Conheça Nosso Legado
          </Link>
          <Image
            className={styles.historyImageMobile}
            src={historySectionImageMobile}
            alt="imagem fachada da loja"
          />
          <Image
            className={styles.historyImageDesktop}
            src={historySectionImageDesktop}
            alt="imagem fachada da loja"
          />
        </div>

        <div className={styles.homeContainer}>
          <h2 className={styles.promosTitle}>
            Aproveite Agora! Explore Nossas Promoções Irresistíveis
          </h2>
          <div className={styles.marker} />
          <p className={styles.promosDesc}>
            Nossas promoções são o convite perfeito para adicionar um toque
            extra de brilho à sua vida. Explore as promoções e descubra
            oportunidades incríveis de adquirir joias excepcionais e acessórios
            elegantes a preços que irão encantar você.
          </p>
        </div>
      </div>

      <div className={styles.feedbacks}>
        <div className={styles.sectionTitleContainer}>
          <h2>Feedbacks que nos inspiram!</h2>
          <div className={styles.marker} />
        </div>
        <CarouselFeedback />
      </div>
      <div className={styles.homePageWrapper}>
        <div className={`${styles.homeContainer} ${styles.newsletter}`}>
          <h2 className={styles.promosTitle}>
            Deseja receber informações sobre a loja?
          </h2>
          <div className={styles.marker} />
          <p className={styles.promosDesc}>
            Não perca nenhuma atualização emocionante e ofertas especiais da
            nossa loja! Inscreva-se agora para receber nossas últimas novidades,
            lançamentos e promoções diretamente na sua caixa de entrada.
          </p>
          <InputEmail />
        </div>
      </div>
    </div>
  );
}

export default Homepage;
