import { AspectRatio, Image } from '@chakra-ui/react'

export default function Picture({
  index,
  src,
  currentIndex,
  set,
}: {
  index: number
  src: string
  currentIndex: number
  set: any
}) {
  function isActive(): boolean {
    return index === currentIndex
  }

  return (
    <AspectRatio
      ratio={1 / 1}
      w='80px'
      me='10px'
      onClick={() => set(index)}
      border={isActive() ? '3px solid' : 'none'}
      borderColor='green.300'
      cursor='pointer'
    >
      <Image src={src} />
    </AspectRatio>
  )
}
