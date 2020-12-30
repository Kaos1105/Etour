import React from "react";
import { Modal, ModalHeader, ModalBody } from "shards-react";

export default ({ title, content, contents, close, callback }) => {
  setTimeout(() => {
    close();
    callback && callback();
  }, 2000);
  const massContent = [];
  contents &&
    contents.map(content => {
      if (Array.isArray(content)) {
        massContent.push(...content.map(item => <div>{item}</div>));
      } else {
        massContent.push(content);
      }
    });

    console.log(contents,massContent)
  return (
    <Modal size="md" open={true} centered>
      <ModalHeader>{title}</ModalHeader>
      <ModalBody>
        <div>{content}</div>
        {massContent}
      </ModalBody>
    </Modal>
  );
};
