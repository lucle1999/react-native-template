import React, { useRef, useContext } from "react";
import { Animated, View } from "react-native";
import { ModalService } from "@ui-kitten/components";
import { deviceHeight, deviceWidth } from "themes/Dimens";
import { StyleSheet } from "react-native";
import { PopUpContext } from "providers/PopUpProvider";
import isEmpty from "lodash/isEmpty";

export const ANIMATION_TYPES = {
  SLIDE: "slide",
  ZOOM: "zoom",
  FADE: "fade"
};

export default function useModalService() {
  const topAnim = useRef(new Animated.Value(deviceHeight)).current;
  const opacityAnim = useRef(new Animated.Value(0)).current;
  const scaleAnim = useRef(new Animated.Value(0)).current;

  const {
    setCurrentModalID,
    removeModalFromQueue,
    currentModalID,
    modalQueue,
    pushModalIntoQueue
  } = useContext(PopUpContext);

  // -----animation------//
  const startShowSlideAnimation = () => {
    Animated.timing(topAnim, {
      toValue: 0,
      duration: 250,
      useNativeDriver: false
    }).start();
  };

  const startHideSlideAnimation = (onModalHide = () => {}) => {
    Animated.timing(topAnim, {
      toValue: deviceHeight,
      duration: 250,
      useNativeDriver: false
    }).start(({ finished }) => {
      if (finished) {
        onModalHide && onModalHide();
      }
    });
  };

  const startShowFadeAnimation = () => {
    Animated.timing(opacityAnim, {
      toValue: 1,
      duration: 250,
      useNativeDriver: true
    }).start();
  };

  const startHideFadeAnimation = (onModalHide = () => {}) => {
    Animated.timing(opacityAnim, {
      toValue: 0,
      duration: 250,
      useNativeDriver: true
    }).start(({ finished }) => {
      if (finished) {
        onModalHide && onModalHide();
      }
    });
  };

  const startShowZoomAnimation = () => {
    Animated.timing(scaleAnim, {
      toValue: 1,
      duration: 250,
      useNativeDriver: true
    }).start();
  };

  const startHideZoomAnimation = (onModalHide = () => {}) => {
    Animated.timing(scaleAnim, {
      toValue: 0,
      duration: 250,
      useNativeDriver: true
    }).start(({ finished }) => {
      if (finished) {
        onModalHide && onModalHide();
      }
    });
  };

  const startAnimationSelector = {
    fade: startShowFadeAnimation,
    slide: startShowSlideAnimation,
    zoom: startShowZoomAnimation
  };

  const hideAnimationSelector = {
    fade: startHideFadeAnimation,
    slide: startHideSlideAnimation,
    zoom: startHideZoomAnimation
  };

  //----end-----//

  const handleShowModalInQueue = () => {
    if (!isEmpty(modalQueue.current)) {
      showModal(modalQueue.current[0]);
    }
    return;
  };

  const FadeAnimationWrapper = ({ children }) => {
    return (
      <Animated.View style={[styles.container, { opacity: opacityAnim }]}>
        {children}
      </Animated.View>
    );
  };

  const ZoomInAnimationWrapper = ({ children }) => {
    return (
      <Animated.View
        style={[styles.container, { transform: [{ scale: scaleAnim }] }]}>
        {children}
      </Animated.View>
    );
  };

  const SlideAnimationWrapper = ({ children }) => {
    return (
      <Animated.View style={[styles.container, { marginTop: topAnim }]}>
        {children}
      </Animated.View>
    );
  };

  const ModalContentWrapper = ({ children, animationType }) => {
    const Wrapper =
      animationType === ANIMATION_TYPES.SLIDE
        ? SlideAnimationWrapper
        : animationType === ANIMATION_TYPES.ZOOM
        ? ZoomInAnimationWrapper
        : FadeAnimationWrapper;
    return (
      <View style={[styles.container, styles.bgColor]}>
        <Wrapper>{children}</Wrapper>
      </View>
    );
  };

  /**
   * @param {renderContent: ()=> JSX Element} function the function render JSX Element
   * @param {animationType: enum("fade" | "slide" | "zoom")} type of animation
   * @param {needPushIntoQueue: boolean} default = true, true => push into queue and show it after current modal hide
   * @returns {string} Returns id (string) of current modal
   * @example
   * const renderContent = ()=> (
   *    <View>
   *      <Text>OK</Text>
   *    </View>
   * )
   * const {showModal} = useModalService()
   * showModal(renderContent, "slide")
   */
  const showModal = ({
    renderContent = () => null,
    animationType = ANIMATION_TYPES.FADE,
    needPushIntoQueue = true
  }) => {
    if (!currentModalID.current) {
      const renderModalWithWrapper = () => (
        <ModalContentWrapper animationType={animationType}>
          {renderContent()}
        </ModalContentWrapper>
      );

      const modalID = ModalService.show(renderModalWithWrapper(), {
        backdropStyle: styles.bgColor
      });

      const animationShowCallback = startAnimationSelector[animationType];
      animationShowCallback();
      setCurrentModalID(modalID);
      if (modalQueue.current?.length) {
        removeModalFromQueue();
      }
      return modalID;
    } else {
      needPushIntoQueue &&
        pushModalIntoQueue({
          renderContent,
          animationType,
          needPushIntoQueue
        });
    }
  };

  /**
   * @param {modalId: string} id (string) of showing modal
   */
  const hideModal = (animationType = ANIMATION_TYPES.SLIDE) => {
    const animationHideCallback = hideAnimationSelector[animationType];
    animationHideCallback(() => {
      ModalService.hide(currentModalID.current);
      setCurrentModalID(null);
      handleShowModalInQueue();
    });
  };

  return {
    showModal,
    hideModal
  };
}

const styles = StyleSheet.create({
  container: {
    height: deviceHeight,
    width: deviceWidth,
    justifyContent: "center",
    alignItems: "center"
  },
  bgColor: {
    backgroundColor: "rgba(0,0,0,0.5)"
  }
});
