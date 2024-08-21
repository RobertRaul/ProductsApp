import { useNavigation } from '@react-navigation/native';
import { Divider, Layout, TopNavigation, TopNavigationAction } from '@ui-kitten/components';
import React, { Children } from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { MyIcon } from '../components/ui/MyIcon';

interface Props {
    title: string;
    subtitle?: string;
    rightAction?: () => void;
    rightActionIcon?: string;
    children: React.ReactNode;
}

export const MainLayout = ({ title, subtitle, rightAction, rightActionIcon, children }: Props) => {

    const { top } = useSafeAreaInsets();

    const { canGoBack, goBack } = useNavigation();

    const renderBackIcon = () => (
        <TopNavigationAction onPress={goBack} icon={<MyIcon name='arrow-back-outline' style={{}} />} />
    )

    const RenderRightAction = () => {
        if (rightAction === undefined || rightActionIcon === undefined) return null;
        return (
            <TopNavigationAction onPress={rightAction} icon={<MyIcon name={rightActionIcon} style={{}} />} />
        )
    }

    return (
        <Layout style={{ paddingTop: top }}>
            <TopNavigation title={title}
                subtitle={subtitle}
                alignment='center'
                accessoryLeft={canGoBack() ? renderBackIcon : undefined}
                accessoryRight={() => <RenderRightAction />}
            />
            <Divider />
            <Layout style={{ height: '100%' }}>
                {children}
            </Layout>

        </Layout>
    )
}
