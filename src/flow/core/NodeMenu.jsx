import { Button,Flex } from "@chakra-ui/react"
import {
  DrawerActionTrigger,
  DrawerBackdrop,
  DrawerBody,
  DrawerCloseTrigger,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerRoot,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer"
import React, {useState} from "react"
import {nodeselects} from '@flowcore/utils/nodeselects';

export const NodeMenu = ({createFrom,setCreateFrom}) => {
  return (
    <DrawerRoot open={Object.keys(createFrom).length !== 0} onOpenChange={(e) => setCreateFrom({})} placement="bottom">
      <DrawerBackdrop />
      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle>Drawer Title</DrawerTitle>
        </DrawerHeader>
        <DrawerBody>
        <Flex
        className="aside"
        justify="space-between"
        wrap="wrap"
        p={4}>
          {nodeselects()}
        </Flex>
        </DrawerBody>
        <DrawerFooter>
          <DrawerActionTrigger asChild>
            <Button variant="outline">Cancel</Button>
          </DrawerActionTrigger>
        </DrawerFooter>
        <DrawerCloseTrigger />
      </DrawerContent>
    </DrawerRoot>
  )
}

