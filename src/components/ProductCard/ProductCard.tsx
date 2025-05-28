import classes from './ProductCard.module.css';

export type TProductCardProps = {
  id?: string;
  image: string;
  name: string;
  price: number;
  discont?: number;
};

export function ProductCard(props: TProductCardProps) {
  const { image, name, price, discont } = props;
  return (
    <>
      <div className={classes.product_card}>
        <div className={classes.product_card_image}>
          <img src={image} alt={`${name} image`} />
        </div>
        <div className={classes.product_card_title}>{name}</div>
        <div className={classes.product_card_price_container}>
          {discont && <span className={classes.discont_price}>${discont}</span>}
          <span
            className={`${classes.regular_price} ${discont && classes.line_through}`}
          >
            ${price}
          </span>
        </div>
      </div>
    </>
  );
}
