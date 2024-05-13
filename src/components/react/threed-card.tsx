import { TextGenerateEffect } from '../ui/text-generate-effect'
import { CardBody, CardContainer, CardItem } from '../ui/3d-card'
import card from '@/assets/bridge.gif'

export function ThreeDCardDemo() {
  return (
    <CardContainer className='inter-var'>
      <CardBody className='bg-background relative group/card border-neon-yellow hover:shadow-2xl hover:shadow-neon-yellow/[0.5] w-auto sm:w-[30rem] h-auto rounded-xl p-6 border'>
        <CardItem translateZ='50' className='text-foreground'>
          <TextGenerateEffect words='LIMITED TRADE DEVELOPMENT' />
        </CardItem>
        <CardItem as='p' translateZ='60' className='text-foreground'>
        Create something special
        </CardItem>
        <CardItem translateZ='100' className='w-auto mt-4'>
          <img
            src={card.src}
            height='1000'
            width='1000'
            className='h-60 w-full object-cover rounded-xl group-hover/card:shadow-xl'
            alt='thumbnail'
          />
        </CardItem>
        <div className='flex justify-between items-center mt-20'>
          <CardItem
            translateZ={20}
            href='https://twitter.com/mannupaaji'
            target='__blank'
            className='px-4 py-2 rounded-xl text-xs font-normal dark:text-white'
          >
            Try now →
          </CardItem>
          <CardItem
            translateZ={20}
            as='button'
            className='px-4 py-2 rounded-xl bg-background text-foreground'
          >
            Sign up
          </CardItem>
        </div>
      </CardBody>
    </CardContainer>
  )
}