import React, { useState } from 'react';
import {StyleSheet, Text, View, FlatList, KeyboardAvoidingView} from 'react-native';
import GrayRectangle from '../Components/GreyRectangle';
import BackButton from '../Components/BackButton';
import { useNavigation } from '@react-navigation/native';
import Montserrat from '../assets/MontSerratFonts';
import FieldForms from "../Components/FieldForms";
import {Picker} from "@react-native-picker/picker";
import ProfileButton from "../Components/ProfileButtonList";
export default function SearchProfileScreen() {
    const navigation = useNavigation();
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedSport, setSelectedSport] = useState('');
    const [selectedLevel, setSelectedLevel] = useState('');


    const profilesData = [
        {
            id: 1,
            firstname: "Paul",
            lastname: "Dupont",
            description: "Paul est un amateur de plein air et de sports. Il aime explorer la nature et rester actif. En dehors de ses activités sportives, Paul apprécie la photographie et capture souvent la beauté du monde qui l'entoure.",
            birthday: new Date("1990-03-10"),
            gender: "masculin",
            country: "Belgique",
            street: "Rue de l'Aventure",
            number: "789",
            locality: "Ville Aventure",
            postalCode: "12345",
            phoneNumber: "555666777",
            mail: 'paul.dupont@mail.com',
            sports: [
                { id: 1, name: "Cyclisme", level: "Pro" },
                { id: 2, name: "Escalade", level: "Amateur" }
            ]
        },
        {
            id: 2,
            firstname: "Jane",
            lastname: "Smith",
            description: "Jane est une passionnée de tennis et de natation. Elle trouve la paix et l'énergie dans ces activités. En dehors des terrains de sport, Jane aime la lecture et les moments de détente avec ses amis.",
            birthday: new Date("1995-08-27"),
            gender: "féminin",
            country: "Belgique",
            street: "Avenue de l'Exemple",
            number: "456",
            locality: "Ville Exemple",
            postalCode: "67890",
            phoneNumber: "987654321",
            mail: 'jane.smith@mail.com',
            sports: [
                { id: 3, name: "Tennis", level: "Amateur" },
                { id: 4, name: "Natation", level: "Semi-Pro" }
            ]
        },
        {
            id: 3,
            firstname: "Alice",
            lastname: "Johnson",
            description: "Passionnée de la nature et des voyages, Alice adore explorer de nouveaux endroits. Elle a une approche positive de la vie et apprécie les petits plaisirs. Sa devise : Carpe Diem.",
            birthday: new Date("1990-05-15"),
            gender: "féminin",
            country: "Belgique",
            street: "Rue Principale",
            number: "789",
            locality: "Villeville",
            postalCode: "54321",
            phoneNumber: "555123789",
            mail: 'alice.johnson@mail.com',
            sports: [
                { id: 5, name: "Randonnée", level: "Débutant" },
                { id: 6, name: "Yoga", level: "Amateur" }
            ]
        },
        {
            id: 4,
            firstname: "Michael",
            lastname: "Lee",
            description: "Michael est un passionné de sports depuis son plus jeune âge. En dehors de son travail, il passe son temps à jouer au football et au golf. Il aime relever de nouveaux défis et améliorer constamment ses compétences.",
            birthday: new Date("1988-12-03"),
            gender: "masculin",
            country: "Belgique",
            street: "Chemin d'Érable",
            number: "321",
            locality: "Villetown",
            postalCode: "67891",
            phoneNumber: "789456123",
            mail: 'michael.lee@mail.com',
            sports: [
                { id: 7, name: "Football", level: "Semi-Pro" },
                { id: 8, name: "Golf", level: "Pro" }
            ]
        },
        {
            id: 5,
            firstname: "Sophie",
            lastname: "Martinez",
            description: "Sophie est une danseuse passionnée et une amatrice de plein air. Elle trouve la paix dans la nature et aime partager des moments de joie avec ses amis. Toujours prête pour une nouvelle aventure.",
            birthday: new Date("1993-07-22"),
            gender: "féminin",
            country: "Belgique",
            street: "Boulevard du Coucher de Soleil",
            number: "567",
            locality: "Bord de Mer",
            postalCode: "34567",
            phoneNumber: "654789321",
            mail: 'sophie.martinez@mail.com',
            sports: [
                { id: 9, name: "Danse", level: "Débutant" },
                { id: 10, name: "Randonnée", level: "Amateur" }
            ]
        },
        {
            id: 6,
            firstname: "David",
            lastname: "Nguyen",
            description: "David est un joueur de tennis de table passionné et un amateur de badminton. Il aime les activités en plein air et cherche toujours de nouvelles façons de rester actif et en forme.",
            birthday: new Date("1985-04-10"),
            gender: "masculin",
            country: "Belgique",
            street: "Vue sur la Montagne",
            number: "876",
            locality: "Haute Terre",
            postalCode: "45678",
            phoneNumber: "987321654",
            mail: 'david.nguyen@mail.com',
            sports: [
                { id: 11, name: "Tennis de table", level: "Pro" },
                { id: 12, name: "Badminton", level: "Amateur" }
            ]
        },
        {
            id: 7,
            firstname: "Elena",
            lastname: "Garcia",
            description: "Elena est une passionnée de volleyball et d'escalade. Elle trouve la force et l'énergie dans le sport et aime repousser ses limites. En dehors des terrains de jeu, elle apprécie les moments de calme avec un bon livre.",
            birthday: new Date("1998-11-05"),
            gender: "féminin",
            country: "Belgique",
            street: "Rue des Roses",
            number: "234",
            locality: "Ville des Fleurs",
            postalCode: "23456",
            phoneNumber: "123987456",
            mail: 'elena.garcia@mail.com',
            sports: [
                { id: 13, name: "Volleyball", level: "Amateur" },
                { id: 14, name: "Escalade", level: "Pro" }
            ]
        },
        {
            id: 8,
            firstname: "Camille",
            lastname: "Martin",
            description: "Camille est une passionnée de sports variés. Elle aime la diversité et la polyvalence. En dehors de ses activités sportives, elle apprécie la musique et joue de la guitare pendant son temps libre.",
            birthday: new Date("1987-09-18"),
            gender: "féminin",
            country: "Belgique",
            street: "Rue de la Musique",
            number: "456",
            locality: "Ville Harmonie",
            postalCode: "56789",
            phoneNumber: "123456789",
            mail: 'camille.martin@mail.com',
            sports: [
                { id: 17, name: "Basketball", level: "Semi-Pro" },
                { id: 18, name: "Course à pied", level: "Amateur" },
                { id: 19, name: "Natation synchronisée", level: "Pro" }
            ]
        },
        {
            id: 9,
            firstname: "Alexandre",
            lastname: "Lefevre",
            description: "Alexandre est un adepte de la course à pied. Il trouve la liberté et la méditation dans chaque foulée. En dehors de la course, il aime explorer de nouveaux itinéraires et découvrir de nouveaux endroits.",
            birthday: new Date("1992-05-25"),
            gender: "masculin",
            country: "Belgique",
            street: "Chemin Jogging",
            number: "789",
            locality: "Ville Athlète",
            postalCode: "98765",
            phoneNumber: "987654321",
            mail: 'alexandre.lefevre@mail.com',
            sports: [
                { id: 20, name: "Course à pied", level: "Pro" }
            ]
        },
        {
            id: 10,
            firstname: "Laura",
            lastname: "Girard",
            description: "Laura est une passionnée de sports et de bien-être. Elle croit en l'équilibre entre le corps et l'esprit. En dehors de ses entraînements, elle pratique la méditation et le yoga pour maintenir une vie équilibrée.",
            birthday: new Date("1993-12-08"),
            gender: "féminin",
            country: "Belgique",
            street: "Avenue Zen",
            number: "123",
            locality: "Ville Sérénité",
            postalCode: "34567",
            phoneNumber: "555888999",
            mail: 'laura.girard@mail.com',
            sports: [
                { id: 21, name: "Pilates", level: "Amateur" },
                { id: 22, name: "Cyclisme", level: "Pro" },
                { id: 23, name: "Yoga", level: "Semi-Pro" }
            ]
        },
        {
            id: 11,
            firstname: "Antoine",
            lastname: "Bertrand",
            description: "Antoine est un passionné de basketball depuis son enfance. Il a joué à différents niveaux et continue de s'entraîner régulièrement. En dehors du terrain, il aime regarder des matchs et soutenir son équipe préférée.",
            birthday: new Date("1989-07-14"),
            gender: "masculin",
            country: "Belgique",
            street: "Rue du Dunk",
            number: "456",
            locality: "Ville Basket",
            postalCode: "56789",
            phoneNumber: "123789456",
            mail: 'antoine.bertrand@mail.com',
            sports: [
                { id: 24, name: "Basketball", level: "Semi-Pro" }
            ]
        }

    ];

    const sports = [
        "Basketball",
        "Running",
        "Tennis",
        "Swimming",
        "Randonnée",
        "Yoga",
        "Football",
        "Golf",
        "Danse",
        "Tennis de table",
        "Badminton",
        "Cyclisme",
        "Escalade",
        "Volleyball",
        "Natation synchronisée",
        "Pilates",
        "Course à pied"
    ];

    const levels = ['Débutant', 'Amateur', 'Semi-Pro', 'Pro'];

    const filteredProfiles = profilesData.filter((profile) => {
        const sportFilter =
            selectedSport !== '' &&
            profile.sports.some((sport) => sport.name === selectedSport && (selectedLevel === '' || sport.level === selectedLevel));

        const searchFilter = profile.firstname.toLowerCase().includes(searchTerm.toLowerCase()) ||
            profile.lastname.toLowerCase().includes(searchTerm.toLowerCase()) ||
            profile.locality.toLowerCase().includes(searchTerm.toLowerCase()) ||
            profile.postalCode.toLowerCase().includes(searchTerm.toLowerCase())

        return (selectedSport === '' || sportFilter) && searchFilter;
    });

    const fontStyles = Montserrat();

    if (!fontStyles) {
        return null;
    }

    return (
        <KeyboardAvoidingView
            behavior={"height"} style={styles.container} keyboardVerticalOffset={-250}>
            <GrayRectangle>
                <Text style={[styles.textTitle, { fontFamily: fontStyles.bold }]}>
                    Chercher un partenaire
                </Text>
                <BackButton style={styles.backButton} right={true} />
            </GrayRectangle>
            <FieldForms
                style={styles.searchInput}
                placeholder="Rechercher un partenaire"
                value={searchTerm}
                onChangeText={(text) => setSearchTerm(text)}
            />
            <View style={styles.containerPicker}>
                <Picker
                    selectedValue={selectedSport}
                    onValueChange={(itemValue) => {
                        setSelectedSport(itemValue);
                        if (itemValue === '') {
                            setSelectedLevel('');
                        }
                    }}
                    mode={'dialog'}
                    style={styles.picker}>
                    <Picker.Item label="Sport" value={''} style={{ color: 'gray', fontSize: 17 }} />
                    {sports.map((sport, index) => (
                        <Picker.Item key={index} label={sport} value={sport} />
                    ))}
                </Picker>
                <Picker
                    selectedValue={selectedLevel}
                    onValueChange={(itemValue) => {
                        setSelectedLevel(itemValue);
                    }}
                    mode={'dialog'}
                    enabled={selectedSport !== ''}
                    style={styles.picker}>
                    <Picker.Item label="Niveau" value={''} style={{ color: 'gray', fontSize: 17 }} />
                    {levels.map((level, index) => (
                        <Picker.Item key={index} label={level} value={level} />
                    ))}
                </Picker>
            </View>
            <FlatList
                data={filteredProfiles}
                renderItem={({ item }) => (
                    <ProfileButton profile={item} />
                )}
                style={styles.listProfiles}
            />
        </KeyboardAvoidingView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f6f7fb',
        alignItems: 'center'
    },
    textTitle: {
        color: 'white',
        fontSize: 21,
    },
    backButton: {
        right: '5%',
    },
    searchInput: {
        width: '90%',
        marginBottom: '0%'
    },
    listProfiles: {
        width: '90%',
        marginTop: '3%',
        maxHeight: '60%',
    },

    containerPicker:{
        flexDirection: 'row',
        justifyContent: 'space-around',
        width: '90%'
    },

    picker:{
        backgroundColor: 'white',
        marginTop: "3%",
        width: '45%'
    },
});