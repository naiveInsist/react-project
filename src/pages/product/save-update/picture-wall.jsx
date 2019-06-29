import React, { Component } from 'react';
import { Upload, Icon, Modal,message } from 'antd';
import { reqDeletePicture } from '../../../api';
export default class PictureWall extends Component {
  state = {
    previewVisible: false,
    previewImage: '',
    fileList: this.props.imgs.map((img,index) => {
      return {
        uid: -index,
        name: img,
        status: 'done',
        url:`http://localhost:5000/upload/${img}`
      }
    })
  };

  handleCancel = () => this.setState({ previewVisible: false });

  handlePreview = async file => {
    this.setState({
      previewImage: file.url || file.preview,
      previewVisible: true,
    });
  };

  handleChange = async ({ fileList,file }) => {
    console.log(file);
    if(file.status === 'uploading') {

    } else if (file.status === 'done') {
      fileList[fileList.length-1].name = file.response.data.name;
      fileList[fileList.length - 1].url = file.response.data.url;
      message.success('上传图片成功 ')
    } else if(file.status === 'error') {
      message.error('上传图片失败')
    } else {
      const id = this.props.id;
      const name = file.name;
      const result = await reqDeletePicture(id,name);
      if(result) {
        message.success('删除图片成功');
      }
    }
    this.setState({
      fileList
    });
  };

  render() {
    const { previewVisible, previewImage, fileList } = this.state;
    const uploadButton = (
      <div>
        <Icon type="plus" />
        <div className="ant-upload-text">Upload</div>
      </div>
    );
    return (
      <div className="clearfix">
        <Upload
          action="/manage/img/upload"
          listType="picture-card"
          fileList={fileList}
          onPreview={this.handlePreview}
          onChange={this.handleChange}
          data={{
            id: this.props.id
          }}
          name="image"
        >
          {fileList.length >= 3 ? null : uploadButton}
        </Upload>
        <Modal visible={previewVisible} footer={null} onCancel={this.handleCancel}>
          <img alt="example" style={{ width: '100%' }} src={previewImage} />
        </Modal>
      </div>
    );
  }
}