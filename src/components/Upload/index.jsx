import React from 'react'
import { Upload, Icon, Modal,message} from 'antd';
import {BASE_URL} from "../../config"
import {reqDeletePic} from '../../api'

function getBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader(); //读取文件内容
    reader.readAsDataURL(file); //方法可以将读取到的文件编码成DataURL ，可以将资料(例如图片、excel文件)内嵌在网页之中，不用放到外部文件
    reader.onload = () => resolve(reader.result);
    reader.onerror = error => reject(error);
  });
}

class PicturesWall extends React.Component {
  state = {
    previewVisible: false,
    previewImage: '',
    fileList: [],
  };
  handleCancel = () => this.setState({ previewVisible: false });
  getPicName=()=>{
      let arr=[]
      this.state.fileList.forEach((item)=>{
         arr.push(item.name)
      })
      return arr;
  }
  // 返显
  setUpdateList=(imgs)=>{
    let arr=[]
    imgs.forEach((item,index)=>{
       arr.push({uid:-index,url:`${BASE_URL}/api/upload/${item}`,name:item})
    })
    this.setState({
       fileList:arr
    })
  }
  handlePreview = async file => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }

    this.setState({
      previewImage: file.url || file.preview,
      previewVisible: true,
    });
  };

  handleChange = async({ file,fileList }) =>{
    if(file.status==="done"){
        // 把响应的url和图片名称  添加到状态中
        fileList[fileList.length-1].url=file.response.data.url 
        fileList[fileList.length-1].name=file.response.data.name 
    }
    if(file.status==="removed") {
        let result=await reqDeletePic({name:file.name})
        const {status} = result;
        if(status===0){
            message.success("删除图片成功！")
        }else{
            message.error("删除图片失败！")
        }
    } 
    this.setState({ fileList });
  }
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
          action={`${BASE_URL}/api/manage/img/upload`}
          listType="picture-card"
          fileList={fileList}
          name="image"
          onPreview={this.handlePreview}
          onChange={this.handleChange}
        >
          {fileList.length >= 4 ? null : uploadButton}
        </Upload>
        <Modal visible={previewVisible} footer={null} onCancel={this.handleCancel}>
          <img alt="example" style={{ width: '100%' }} src={previewImage} />
        </Modal>
      </div>
    );
  }
}
export default PicturesWall
