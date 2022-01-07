import {ref, onMounted} from 'vue'
import {getImageApi} from '@/api/user/user'

export default function useImage() {
  let imgSrc = ref('')

  const getImage = () => {
    getImageApi()
      .then((res) => {
        // console.log(res)
        return 'data:image/png;base64,' + btoa(
          new Uint8Array(res.data as any).reduce((data, byte) => data + String.fromCharCode(byte), '')
        )
      })
      .then((data) => {
        imgSrc.value = data
      })
  }

  onMounted(() => {
    getImage()
  })

  return {
    imgSrc,
    getImage
  }
}