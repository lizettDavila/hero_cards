import React, { useEffect, useState } from "react";
import Header from "../Header/Header";
import HeroCard from "../HeroCard/HeroCard";
import { getPosts } from "../../services/service";
import { Row, Col, Pagination } from "antd";
import styles from "./Layout.module.scss";

const Layout = () => {
  const [posts, setPosts] = useState<[]>([]);
  const [current, setCurrent] = useState(1);
  const [pageSize, setPageSize] = useState(12);
  const [minIndex, setMinIndex] = useState(0);
  const [maxIndex, setMaxIndex] = useState(12);

  const getInformation = async () => {
    const [posts] = await getPosts();
    if (posts === null) return;
    setPosts(posts);
  };
  const handleChangePage = (page: number) => {
    setCurrent(page);
    setMinIndex((page - 1) * pageSize);
    setMaxIndex(page * pageSize);
    window.scrollTo(0, 0);
  };
  useEffect(() => {
    getInformation();
  }, []);
  console.log(minIndex, maxIndex);
  return (
    <div className={styles.Container}>
      <Row justify="center">
        <Col span={24}>
          <Header
            data={posts}
            setPosts={setPosts}
            getAllPosts={getPosts()}
            setMinIndex={setMinIndex}
            setMaxIndex={setMaxIndex}
          />
        </Col>

        <Row
          justify="center"
          className={styles.ContainerCards}
          gutter={[16, 24]}
        >
          {posts?.map(
            (post: any, index: number) =>
              index >= minIndex &&
              index < maxIndex && (
                <Col key={index} xs={24} sm={24} md={12} lg={8}>
                  <HeroCard data={post} />
                </Col>
              )
          )}
        </Row>
        <Pagination
          responsive={true}
          pageSize={pageSize}
          current={current}
          total={posts.length}
          showSizeChanger={false}
          showQuickJumper={false}
          onChange={handleChangePage}
          className={styles.Pagination}
        />
      </Row>
    </div>
  );
};

export default Layout;
