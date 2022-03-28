import React, { useState, useEffect } from "react";
import { Row, Col, Input } from "antd";
import { getPosts } from "../../services/service";
import styles from "./Header.module.scss";

const Header = (props: any) => {
  const { Search } = Input;
  const [author, setAuthor] = useState<string | null>(null);
  const { data, setPosts, setMaxIndex, setMinIndex} = props;

  const getInformation = async () => {
    const [posts] = await getPosts();
    if (posts === null) return;
    setPosts(posts);
  };

  const handleSearch = () => {
    if (author !== "") {
      const newPosts = data?.filter((item: any) => {
        return item.parsely.meta.creator[0]
          .toUpperCase()
          .includes(author.toUpperCase());
      });
      setPosts(newPosts);
      setMinIndex(0)
      setMaxIndex(newPosts.length)
    } else {
      getInformation();
    }
  };

  useEffect(() => {
    if (author === "") {
      getInformation();
    }
  }, [author]);

  return (
    <Row justify="center" className={styles.Header}>
      <Col span={12}>HeroPosts</Col>
      <Col span={12}>
        <Search
          defaultValue={author}
          placeholder="Author's name"
          className={styles.Input}
          onChange={(e: any) => setAuthor(e.target.value)}
          onSearch={handleSearch}
        />
      </Col>
    </Row>
  );
};

export default Header;
