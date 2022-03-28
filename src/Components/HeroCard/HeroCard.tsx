import React from "react";
import { Card, Button, Tag } from "antd";
import { FiCalendar, FiUser, FiBook, FiKey } from "react-icons/fi";
import moment from "moment";
import styles from "./HeroCard.module.scss";

const HeroCard = (props: any) => {
  const { data } = props;

  return (
    <div className={styles.Container}>
      <Card className={styles.Card}>
        <div className={styles.Image}>
          <img src={data.jetpack_featured_media_url} />
          <Tag className={styles.Tag}>
            <span>Version</span>
            <p>{data.parsely.version}</p>
          </Tag>
        </div>

        <div className={styles.Information}>
          <div className={styles.Date}>
            <FiCalendar className={styles.Icon} />
            <span>Published at:</span>
            <p>
              {moment(data.parsely.meta.datePublished).format("DD/MMM/YYYY")}
            </p>
          </div>

          <div className={styles.Publisher}>
            <FiBook className={styles.Icon} />
            <span>Publisher:</span>
            <img src={data.parsely.meta.publisher.logo.url} />
          </div>
          <div className={styles.Author}>
            <FiUser className={styles.Icon} />
            <span>Author:</span>
            <p>{data.parsely.meta.creator[0]}</p>
          </div>
          <div className={styles.Keyword}>
            <FiKey className={styles.Icon} />
            <span>Keyword:</span>
            <p>{data.parsely.meta.keywords[1].charAt(0).toUpperCase() + data.parsely.meta.keywords[1].slice(1)}</p>
          </div>
          <p className={styles.Title}>{data.title.rendered}</p>
        </div>

        <div className={styles.ButtonContainer}>
          <Button type="primary" className={styles.Button}>
            <a href={data.link} target="_blank">
              Ir al post
            </a>
          </Button>
        </div>
      </Card>
    </div>
  );
};
export default HeroCard;
