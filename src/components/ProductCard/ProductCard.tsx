import { useNavigate, useParams } from 'react-router';
import classes from './ProductCard.module.css';
import { LocalizedString } from '@commercetools/platform-sdk';

export type TProductCardProps = {
  id?: string;
  image: string;
  name: string;
  price: number;
  discont?: number;
  slug: LocalizedString;
  description?: string;
};

export function ProductCard(props: TProductCardProps) {
  const { id, image, name, price, discont, description, slug } = props;
  const navigate = useNavigate();
  const { categoryName, subcategoryName } = useParams();

  const handleClick = () => {
    let productUrl = '';

    if (categoryName && subcategoryName) {
      productUrl = `/catalog/${categoryName}/${subcategoryName}/product/${slug['en-US']}`;
    } else if (categoryName) {
      productUrl = `/catalog/${categoryName}/product/${slug['en-US']}`;
    } else {
      productUrl = `/catalog/product/${slug['en-US']}`;
    }

    navigate(productUrl, { state: id });
  };

  return (
    <>
      <div className={classes.product_card} onClick={handleClick}>
        <div className={classes.product_card_image}>
          <img src={image} alt={`${name} image`} />
        </div>
        <div className={classes.product_card_info}>
          <div className={classes.product_card_title}>{name}</div>
          <div className={classes.product_card_description}>{description}</div>
          <div className={classes.product_card_price_container}>
            {discont && (
              <span className={classes.discont_price}>${discont}</span>
            )}
            <span
              className={`${classes.regular_price} ${discont && classes.line_through}`}
            >
              ${price}
            </span>
          </div>
        </div>
      </div>
    </>
  );
}
