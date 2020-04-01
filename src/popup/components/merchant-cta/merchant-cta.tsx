import React from 'react';
import { Link } from 'react-router-dom';
import { Merchant } from '../../../services/merchant';
import CardDenoms from '../card-denoms/card-denoms';
import { resizeFrameForPath } from '../../../services/frame';

const MerchantCta: React.FC<{ merchant?: Merchant }> = ({ merchant }) => {
  const ctaPath = merchant && (merchant.hasDirectIntegration ? `/brand/${merchant.name}` : `/amount/${merchant.name}`);
  const hasDiscount = false;
  return (
    <>
      {merchant ? (
        <div className="merchant-cta">
          <div className="merchant-cta__content">
            <img src={merchant.icon} alt={`${merchant.displayName} icon`} />
            <div className="merchant-cta__content__text ellipsis">
              <div className="merchant-cta__content__merchant ellipsis">{merchant.displayName}</div>
              {hasDiscount ? (
                <div className="merchant-cta__content__promo ellipsis">3% Off Each Purchase</div>
              ) : (
                <>
                  {merchant.hasDirectIntegration ? (
                    <div className="merchant-cta__content__caption ellipsis">{merchant.caption}</div>
                  ) : (
                    <div className="merchant-cta__content__caption ellipsis">
                      <CardDenoms cardConfig={merchant.giftCards[0]} />
                    </div>
                  )}
                </>
              )}
            </div>
          </div>
          <Link to={{ pathname: ctaPath, state: { merchant } }}>
            {merchant.hasDirectIntegration ? <>Learn More</> : <>Buy Now</>}
          </Link>
        </div>
      ) : (
        <div className="merchant-cta">
          <img className="merchant-cta__zero__hero" src="./../assets/brands.png" alt="brands" />
          <div className="merchant-cta__zero__title">Spend Crypto Instantly</div>
          <div className="merchant-cta__zero__description">
            Purchase store credit with BTC, BCH, ETH and more at 100+ major retailers.
          </div>
          <Link className="zero" to={{ pathname: '/shop' }} onClick={(): void => resizeFrameForPath('/shop')}>
            View All Brands
          </Link>
        </div>
      )}
    </>
  );
};

export default MerchantCta;