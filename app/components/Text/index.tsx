import React, {ReactNode} from 'react';
import {StyleSheet, Text as NativeText, TextProps} from 'react-native';
import {useTheme} from '#utils/theme';

export enum FontWeight {
    LIGHT = 'LIGHT',
    NORMAL = 'NORMAL',
    MEDIUM = 'MEDIUM',
    SEMI_BOLD = 'SEMI_BOLD',
    BOLD = 'BOLD',
}

export enum TextTypes {
    H1 = 'H1',
    H2 = 'H2',
    H3 = 'H3',
    H4 = 'H4',
    SUBTITLE = 'SUBTITLE',
    BODY_LARGE = 'BODY_LARGE',
    BODY_MEDIUM = 'BODY_MEDIUM',
    BODY_SMALL = 'BODY_SMALL',
}

interface Props extends TextProps {
    type?: TextTypes;
    color?: string;
    numberOfLines?: number;
    weight?: FontWeight;
    children?: ReactNode;
}

export const Text = ({color, numberOfLines, style, weight, type = TextTypes.BODY_SMALL, children, ...rest}: Props) => {
    const {colors} = useTheme();

    return (
        <NativeText
            allowFontScaling={false}
            style={[
                {color: color || colors.text},
                styles.default,
                textTypesStyles[type],
                weight ? styles[weight] : undefined,
                style,
            ]}
            numberOfLines={numberOfLines}
            {...rest}>
            {children}
        </NativeText>
    );
};

export default Text;

const styles = StyleSheet.create({
    [FontWeight.LIGHT]: {
        fontFamily: 'Poppins-Light',
    },
    [FontWeight.NORMAL]: {
        fontFamily: 'Poppins-Regular',
    },
    [FontWeight.MEDIUM]: {
        fontFamily: 'Poppins-Medium',
    },
    [FontWeight.SEMI_BOLD]: {
        fontFamily: 'Poppins-SemiBold',
    },
    [FontWeight.BOLD]: {
        fontFamily: 'Poppins-Bold',
    },
    default: {
        includeFontPadding: false,
    },
});

export const textTypesStyles = StyleSheet.create({
    [TextTypes.H1]: {
        fontSize: 20,
        lineHeight: 32,
        ...styles[FontWeight.BOLD],
    },
    [TextTypes.H2]: {
        fontSize: 16,
        lineHeight: 24,
        ...styles[FontWeight.SEMI_BOLD],
    },
    [TextTypes.H3]: {
        fontSize: 14,
        lineHeight: 20,
        ...styles[FontWeight.SEMI_BOLD],
    },
    [TextTypes.H4]: {
        fontSize: 12,
        lineHeight: 16,
        ...styles[FontWeight.MEDIUM],
    },
    [TextTypes.SUBTITLE]: {
        fontSize: 20,
        lineHeight: 32,
        ...styles[FontWeight.NORMAL],
    },
    [TextTypes.BODY_LARGE]: {
        fontSize: 16,
        lineHeight: 24,
        ...styles[FontWeight.NORMAL],
    },
    [TextTypes.BODY_MEDIUM]: {
        fontSize: 14,
        lineHeight: 20,
        ...styles[FontWeight.NORMAL],
    },
    [TextTypes.BODY_SMALL]: {
        fontSize: 12,
        lineHeight: 16,
        ...styles[FontWeight.NORMAL],
    },
});
