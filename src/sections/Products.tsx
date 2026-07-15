import { PRODUCTS_ACQUISITION, PRODUCTS_IN_DEVELOPMENT } from "@/lib/data";
import { Reveal } from "@/components/common/Reveal";
import { SpotlightGroup } from "@/components/common/SpotlightGroup";
import { LiveProductCard } from "@/components/ui/LiveProductCard";
import { ProductCard } from "@/components/ui/ProductCard";

export function Products() {
  return (
    <section
      id="apps"
      className="relative z-[1] mx-auto max-w-[1200px] px-[clamp(20px,5vw,64px)] pb-[clamp(40px,6vw,70px)] pt-[clamp(60px,8vw,100px)]"
    >
      {/* Live */}
      <Reveal as="div" className="mb-[18px] flex items-center gap-[12px]">
        <span className="font-mono text-[12px] uppercase tracking-[0.18em] text-green">
          live on the play store
        </span>
        <span className="h-px flex-1 opacity-[0.35] [background:linear-gradient(90deg,var(--green),transparent)]" />
      </Reveal>
      <Reveal
        as="h2"
        className="mb-[34px] font-grotesk text-[clamp(28px,4vw,44px)] font-bold tracking-[-0.02em]"
      >
        Our first app is out
      </Reveal>
      <LiveProductCard />

      {/* In development */}
      <Reveal as="div" className="mb-[26px] flex items-center gap-[12px]">
        <h2 className="font-grotesk text-[clamp(24px,3.4vw,36px)] font-bold tracking-[-0.02em] text-text">
          In development
        </h2>
        <span className="h-px flex-1 opacity-[0.35] [background:linear-gradient(90deg,var(--accent),transparent)]" />
      </Reveal>
      <SpotlightGroup className="mb-[54px] grid grid-cols-[repeat(auto-fit,minmax(280px,1fr))] gap-[20px]">
        {PRODUCTS_IN_DEVELOPMENT.map((product) => (
          <ProductCard key={product.name} product={product} />
        ))}
      </SpotlightGroup>

      {/* Acquisition */}
      <Reveal as="div" className="mb-[10px] flex items-center gap-[12px]">
        <h2 className="font-grotesk text-[clamp(24px,3.4vw,36px)] font-bold tracking-[-0.02em] text-text">
          Projects available to buy
        </h2>
        <span className="h-px flex-1 opacity-40 [background:linear-gradient(90deg,var(--violet),transparent)]" />
      </Reveal>
      <Reveal
        as="div"
        className="mb-[26px] inline-flex items-center gap-[8px] rounded-full border border-[rgba(167,139,250,0.35)] bg-[rgba(167,139,250,0.08)] px-[13px] py-[6px] font-mono text-[11px] uppercase tracking-[0.12em] text-violet"
      >
        💰 Open for Acquisition
      </Reveal>
      <SpotlightGroup className="grid grid-cols-[repeat(auto-fit,minmax(280px,1fr))] gap-[20px]">
        {PRODUCTS_ACQUISITION.map((product) => (
          <ProductCard key={product.name} product={product} />
        ))}
      </SpotlightGroup>
    </section>
  );
}
