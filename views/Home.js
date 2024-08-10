import React, { useState, useEffect, useContext } from "react";
import { useTheme, Button, Card, ActivityIndicator, List, Snackbar, Avatar } from 'react-native-paper';
import { VStack } from "@react-native-material/core";
import { Image, View, StyleSheet } from 'react-native';
import { HttpRequestContext } from "../providers/httpRequest";

const Home = () => {
    const { colors } = useTheme();
    const { fetchPokemon, pokemon, loading, options } = useContext(HttpRequestContext);
    const [disabledButtons, setDisabledButtons] = useState([]);
    const [selectedOption, setSelectedOption] = useState(null);
    const [warningOpen, setWarningOpen] = useState(false);


    useEffect(() => {
        fetchPokemon();
    }, []);

    const checkAnswer = (name) => {
        setSelectedOption(name);
        if (name === pokemon.name) {
            setDisabledButtons(options);
        } else {
            setWarningOpen(true)
            setDisabledButtons([...disabledButtons, name]);
        }
    };

    const getButtonBackgroundColor = (name) => {
        if (selectedOption === name && name === pokemon.name) {
            return colors.success;
        }
        if (disabledButtons.includes(name)) {
            return colors.disabled || colors.opaquePrimary;
        }
        return colors.primary;
    };

    const isCorrectAnswerSelected = () => {
        return selectedOption && selectedOption === pokemon.name && !loading;
    };

    return (
        <>
            <VStack spacing={15} h='100%' p={25}>
                <Card style={{ backgroundColor: colors.backdrop }}>
                    <Card.Title
                        titleStyle={{ color: colors.text, textAlign: 'center', fontSize: 20, paddingTop: 25 }}
                        title="Who's that Pokemon?"
                    />
                    <Card.Content style={{ alignItems: 'center', padding: 20 }}>
                        {!loading && pokemon && options.length > 0 ? (
                            <>
                                <View style={styles.spriteContainer}>
                                    <Image
                                        source={{ uri: pokemon.sprites.front_default }}
                                        style={[
                                            styles.spriteImage,
                                            !isCorrectAnswerSelected() && styles.silhouette
                                        ]}
                                    />
                                </View>
                                <List.Section>
                                    <List.Subheader style={{ color: colors.text }}>Select the Pokémon:</List.Subheader>
                                    {options.map((e, i) => (
                                        <Button
                                            key={i}
                                            mode="contained"
                                            onPress={() => checkAnswer(e)}
                                            disabled={disabledButtons.includes(e)}
                                            style={{
                                                margin: 5,
                                                backgroundColor: getButtonBackgroundColor(e),
                                            }}
                                            labelStyle={{ color: colors.text }}
                                        >
                                            {e.slice(0, 1).toUpperCase() + e.slice(1, e.length)}
                                        </Button>
                                    ))}
                                </List.Section>
                            </>
                        ) : (
                            <ActivityIndicator animating={true} color={colors.primary} size={100} />
                        )}
                    </Card.Content>
                </Card>
                {isCorrectAnswerSelected() && (
                    <Button
                        mode="contained"
                        onPress={fetchPokemon}
                        labelStyle={{ color: colors.text }}
                        style={{ width: 175, margin: 5, marginRight: 'auto', marginLeft: 'auto', backgroundColor: colors.primary }}
                    >
                        New Pokemon
                    </Button>
                )}
            </VStack>
            <VStack alignItems='center'>
                <Snackbar visible={warningOpen} onDismiss={() => setWarningOpen(false)}
                    duration={2000} style={{ backgroundColor: colors.warning }}
                    contentStyle={{
                        flexDirection: 'row',
                        alignItems: 'center',
                    }}>
                    <Card.Title titleNumberOfLines={3} subtitleNumberOfLines={2} title="You were flipped the bird!" subtitle="Pick another pokemon" left={props => <Avatar.Icon {...props} icon="information-outline" style={{ backgroundColor: "transparent" }} />} />
                </Snackbar>
            </VStack>
        </>
    );
};

const styles = StyleSheet.create({
    spriteContainer: {
        width: 250,
        height: 250,
        alignItems: 'center',
        justifyContent: 'center',
    },
    spriteImage: {
        width: '100%',
        height: '100%',
        resizeMode: 'contain',
    },
    silhouette: {
        tintColor: 'black', // This makes the image appear as a silhouette
    },
});

export default Home;
